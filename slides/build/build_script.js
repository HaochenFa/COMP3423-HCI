// Builds slides/COMP3423_App1933_Presentation_Script.docx, the narration for the
// presentation video. Edit the words here and rebuild:  node build_script.js
//
// Each entry is one slide. Strings are read aloud; { cue } entries are actions
// for the presenter and are not read. Times are estimated from the word count
// at an even pace (WPM below), except where an entry sets its own (the demo).
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, HeadingLevel, Header, Footer, PageNumber, ShadingType, TabStopType,
} = require("docx");

const OUT = path.join(__dirname, "..", "COMP3423_App1933_Presentation_Script.docx");
const WPM = 145;      // speaking pace used for the time estimates
const PAUSE = 1;      // seconds added per slide for the change of slide

const FONT = "Arial";
const INK = "1A1A1A", GREY = "5F5F5F", RED = "C8102E", RULE = "D0D0D0";

const cue = (t) => ({ cue: t });

const SLIDES = [
  { n: 1, title: "Title", who: "Haochen Fa", say: [
    "Hi everyone, we're Group A21, and our project is a redesign of App1933, the official app of KMB and Long Win Bus. I'm Haochen, the project lead, and I'll start with who we designed for.",
  ] },
  { n: 2, title: "Two groups of passengers, one question", who: "Haochen Fa", say: [
    "Most people open App1933 just to check when their bus is coming, so we built the redesign around that question.",
    "We focused on two groups of users. Older passengers often know where they're going but not the route number, and they find small text hard to read. Students and commuters, on the other hand, are comfortable with phones, but they're usually in a hurry.",
  ] },
  { n: 3, title: "Problems in the current app", who: "Haochen Fa", say: [
    "Looking at these real screenshots of the current app, you can see that both groups have to work quite hard for that answer. The app opens with a full-screen advert, search only accepts route numbers, and saving a stop takes seven taps. On top of that, none of the 26 icons in the menu lets you make the text bigger.",
  ] },
  { n: 4, title: "Journey map", who: "Chenyang Zhang", say: [
    "Hi, I'm Chenyang, the user researcher. Our journey map follows both groups through four stages, and it shows that their worst moments are in the same two places: when they open the app and get an advert instead of the arrival time, and when they search and the app asks for a route number or a stop code.",
  ] },
  { n: 5, title: "Navigation", who: "Xulu Zhang", say: [
    "Hi, I'm Xulu, and I worked on the interaction design. We started by simplifying the structure into five labelled tabs, each answering one question, and we made sure a route always opens the same screen wherever you tap it, so users only need to learn it once.",
  ] },
  { n: 6, title: "Visual language", who: "Li-En Lo", say: [
    "Hi, I'm Li-En, the visual and UI designer. We kept KMB's red, but we only use it for the header and for things you can tap. We also made the arrival time the largest text on every card, and its status is written out in words rather than shown by colour alone.",
  ] },
  { n: 7, title: "F1 Home", who: "Li-En Lo", say: [
    "Our first feature is Home. In the current app, Home starts with a promotion banner and a floating button over the list, and the times don't say whether they're live.",
    "Our Home opens with your saved routes, and every time is labelled Live or Scheduled, which follows Nielsen's heuristic of visibility of system status. In the test, all nine participants read the next Bus 8 correctly.",
  ] },
  { n: 8, title: "F2 Save", who: "Xulu Zhang", say: [
    "Home only works if saving is easy, but in the current app, Save is hidden in a menu behind an unlabelled icon.",
    "In our design, every stop has a large star and the nearest one has a Save this stop button, so users can recognise the action instead of remembering it, and they can undo it straight away. Eight of nine participants saved the stop, though only two got there the way we expected, which Chenyang will come back to.",
  ] },
  { n: 9, title: "F3 Trip", who: "Xulu Zhang", say: [
    "For trip planning, people think in places rather than route numbers, but the current search only accepts route numbers. Our planner starts from your current location, so you only type where you're going, and each suggestion shows the type of place and its street. All nine participants managed to plan the trip.",
  ] },
  { n: 10, title: "F4 Nearby", who: "Li-En Lo", say: [
    "Nearby had a similar problem, because it asks for a stop code that few passengers know. Our version lists stops by walking time and street, and the Landmarks filter answers questions like which bus goes to the hospital. All nine participants named both buses to Queen Elizabeth Hospital.",
  ] },
  { n: 11, title: "F5 More", who: "Moling Kong", say: [
    "Hi, I'm Moling, and I led accessibility and evaluation. The old More menu puts 26 icons in one grid, and according to Hick's law, more choices make decisions slower, so we reduced it to three groups with text size at the top.",
    "At the largest setting, headings double and body text grows by about half, and all nine participants could still read the next Bus 116.",
  ] },
  { n: 12, title: "Accessibility", who: "Moling Kong", say: [
    "We also checked the original app against WCAG, and the clearest failure was text size: even with the iPhone's text size at maximum, the Home screen stays exactly the same. In our design, almost all text meets the contrast minimum and no link is smaller than 24 points, although we haven't tested it with a screen reader yet.",
  ] },
  { n: 13, title: "Live walkthrough", who: "Xulu Zhang", seconds: 85, say: [
    cue("Switch to Figma: the prototype in Present mode with the iPhone device frame, flow \"First launch (en-GB)\". Screens don't scroll in Present mode, so stay on what is visible."),
    "Now I'll show you the prototype that we tested, starting with a commuter on the way to work.",
    cue("Tap Get started, then allow location."),
    "Home opens straight on route 8, with the next bus in five minutes, marked as live.",
    cue("Tap the route 8 card, then open the full route."),
    "From the card, I can open the full route, where every stop has a star, so I'll save Cross Harbour Tunnel.",
    cue("Save Cross Harbour Tunnel."),
    "And if I change my mind, I can just tap Undo.",
    cue("Tap Undo, then open the Trip tab."),
    "Next is an older passenger who knows the place but not the bus. The trip planner already starts from my location, so I only need to choose Argyle Centre.",
    cue("Tap the Argyle Centre suggestion."),
    "And the recommended option is right at the top.",
    cue("Open Nearby, then tap Landmarks."),
    "In Nearby, the Landmarks filter lists places by name, together with the buses that serve them.",
    cue("Open More, press A+ twice, then go back to Home."),
    "Finally, after making the text bigger in More, the headings on Home are twice the size.",
    cue("Switch back to the slides."),
  ] },
  { n: 14, title: "The test", who: "Chenyang Zhang", say: [
    "So, to see whether the design works, we ran an unmoderated test on Maze with nine participants, who completed nine tasks and answered questions about what they saw. We should point out that none of them was over 60, and five used a laptop, so most taps were actually mouse clicks.",
  ] },
  { n: 15, title: "Results overall", who: "Chenyang Zhang", say: [
    "Overall, everyone finished, and 78 of the 81 task attempts were successful. The usability score was 71 out of 100, and all nine rated the design good or very good. However, phone users followed the expected path much less often than laptop users, which matters for a mobile app.",
  ] },
  { n: 16, title: "Reading the answer", who: "Chenyang Zhang", say: [
    "Most importantly, people could read the information correctly once they reached the right screen. The two questions about journey duration scored lower, but we think that was mainly because of how we worded them. The only ratings of \"a little difficult\" were for saving a stop.",
  ] },
  { n: 17, title: "The save finding", who: "Chenyang Zhang", say: [
    "Saving was our weakest task: only two of nine took the expected path, and it had the lowest score, 43. The problem was getting to the route screen, because three people tapped this stop card on Home 13 times, but it doesn't open anything, and the only way in is a small text link. Once they got there, all eight saved the stop, so the card simply needs to look tappable.",
  ] },
  { n: 18, title: "What we keep", who: "Chenyang Zhang", say: [
    "That said, we didn't change the design for every comment. Two people didn't expect text size to be under More, but seven of nine went there first, which is also where most apps keep it. And although some people missed the Map view link, eight of nine still reached the map within two taps, so we'd make the link more visible rather than add another tab.",
  ] },
  { n: 19, title: "Iteration", who: "Li-En Lo", say: [
    "Before the next steps, I'll briefly show how the design developed. We went through three dated versions, recorded in Figma's version history, and here is the route results screen on 28 October, 30 October and 5 November. We froze the design before testing, so none of the test findings have been applied yet.",
  ] },
  { n: 20, title: "Next step", who: "Haochen Fa", say: [
    "For the saving problem, our next step would be a stop page that opens wherever a stop appears, such as the Home card, Nearby, the map and search, with every route at that stop and a labelled Save button. We'd test it with the same task, and the table lists four smaller changes, including a test with older passengers in Cantonese.",
  ] },
  { n: 21, title: "Summary and limitations", who: "Haochen Fa", say: [
    "To sum up, we tried to answer the question \"when is my bus coming?\" on the first screen, and the test shows that people can read that answer. The main weakness is getting into saving, which the stop page should solve.",
    "Our main limitations are the young sample, mostly on laptops, and a prototype with only simple links. All our links are on this slide. Thank you for watching.",
  ] },
];

// ---- timing ---------------------------------------------------------------
const words = (s) => s.split(/\s+/).filter(Boolean).length;
for (const s of SLIDES) {
  s.words = s.say.filter((x) => typeof x === "string").reduce((a, x) => a + words(x), 0);
  s.secs = s.seconds || Math.round((s.words / WPM) * 60 + PAUSE);
}
const total = SLIDES.reduce((a, s) => a + s.secs, 0);
const round5 = (x) => Math.max(5, Math.round(x / 5) * 5);
const clock = (x) => `${Math.floor(x / 60)}:${String(x % 60).padStart(2, "0")}`;
const mins = (x) => `${Math.floor(x / 60)} min ${x % 60} s`;

// Speaker turns: consecutive slides by the same presenter.
const turns = [];
let at = 0;
for (const s of SLIDES) {
  const last = turns[turns.length - 1];
  if (last && last.who === s.who) { last.to = s.n; last.secs += s.secs; }
  else turns.push({ who: s.who, from: s.n, to: s.n, start: at, secs: s.secs });
  at += s.secs;
}

// ---- document -------------------------------------------------------------
const run = (text, o = {}) => new TextRun({ text, font: FONT, color: INK, ...o });
const para = (children, o = {}) => new Paragraph({ children, ...o });

const border = { style: BorderStyle.SINGLE, size: 4, color: RULE };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
function cell(text, w, o = {}) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: o.head ? { type: ShadingType.CLEAR, fill: "F2F2F2", color: "auto" } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    borders: { top: border, bottom: border, left: noBorder, right: noBorder },
    children: [para([run(text, { size: 20, bold: !!o.head })], { alignment: o.align || AlignmentType.LEFT })],
  });
}
const COLS = [900, 1500, 3700, 1500, 1400];
const orderTable = new Table({
  width: { size: COLS.reduce((a, b) => a + b, 0), type: WidthType.DXA },
  columnWidths: COLS,
  rows: [
    new TableRow({ tableHeader: true, children: ["Turn", "Slides", "Presenter", "Starts at", "Length"].map((t, i) => cell(t, COLS[i], { head: true })) }),
    ...turns.map((t, i) => new TableRow({ children: [
      cell(String(i + 1), COLS[0]),
      cell(t.from === t.to ? String(t.from) : `${t.from}–${t.to}`, COLS[1]),
      cell(t.who, COLS[2]),
      cell(clock(t.start), COLS[3]),
      cell(clock(t.secs), COLS[4]),
    ] })),
  ],
});

const body = [];
body.push(para([run("Presentation script", { size: 40, bold: true })], { spacing: { after: 80 } }));
body.push(para([run("Re-designing App1933  ·  COMP3423 Group A21", { size: 24, color: GREY })], { spacing: { after: 280 } }));
body.push(para([run(
  "This is the narration for the presentation video. Each section matches one slide of COMP3423_App1933_Presentation.pptx. " +
  "Lines in grey square brackets are actions for the presenter and are not read aloud. " +
  `Read at an even pace of about ${WPM} words a minute, the script runs about ${mins(round5(total))}, inside the 10-minute limit. ` +
  "The times below are estimates from the word count; the walkthrough is timed with its clicks.",
  { size: 21 })], { spacing: { after: 240, line: 300 } }));
body.push(para([run("Order of speakers", { size: 24, bold: true })], { spacing: { after: 120 }, keepNext: true }));
body.push(orderTable);

let prev = null;
for (const s of SLIDES) {
  const newSpeaker = s.who !== prev;
  prev = s.who;
  body.push(new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [run(`Slide ${s.n}`, { color: RED, bold: true, size: 26 }), run(`   ${s.title}`, { bold: true, size: 26 })],
    spacing: { before: 360, after: 60 },
    keepNext: true,
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 4 } },
  }));
  body.push(para([
    run(s.who, { size: 20, bold: newSpeaker, color: newSpeaker ? INK : GREY }),
    run(`  ·  about ${s.seconds ? s.secs : round5(s.secs)} seconds`, { size: 20, color: GREY }),
    ...(newSpeaker && s.n > 1 ? [run("  ·  new speaker", { size: 20, color: RED })] : []),
  ], { spacing: { after: 160 }, keepNext: true }));
  for (const x of s.say) {
    if (typeof x === "string") {
      body.push(para([run(x, { size: 25 })], { spacing: { after: 160, line: 360 } }));
    } else {
      body.push(para([run(`[${x.cue}]`, { size: 20, italics: true, color: GREY })], { spacing: { after: 140, line: 288 }, keepNext: true }));
    }
  }
}

const doc = new Document({
  creator: "COMP3423 Group A21",
  title: "Re-designing App1933: presentation script",
  styles: {
    default: { document: { run: { font: FONT, size: 22, color: INK } } },
    paragraphStyles: [
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: 26, bold: true, color: INK }, paragraph: { spacing: { before: 360, after: 60 }, keepNext: true, outlineLevel: 1 } },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1247, bottom: 1247, left: 1304, right: 1304, header: 567, footer: 510 } } },
    headers: { default: new Header({ children: [para([
      run("COMP3423 Group A21", { size: 16, color: GREY }),
      run("\tPresentation script", { size: 16, color: GREY }),
    ], { tabStops: [{ type: TabStopType.RIGHT, position: 9298 }] })] }) },
    footers: { default: new Footer({ children: [para([new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 17, color: GREY })], { alignment: AlignmentType.CENTER })] }) },
    children: body,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log(`Wrote ${path.relative(process.cwd(), OUT)}`);
  for (const s of SLIDES) console.log(`  ${String(s.n).padStart(2)}  ${String(s.words).padStart(3)} words  ${String(s.secs).padStart(3)} s  ${s.who}`);
  console.log(`  total ${SLIDES.reduce((a, s) => a + s.words, 0)} words, ${mins(total)}`);
});

// Appendices A–E
const path = require("path");
const L = require("./lib");
const { D, P, H1, H2, bullets, table, caption, figure } = L;
const { AlignmentType } = D;
const { FIGMA, PROTO, MAZE } = require("./part1");

const ROOT = path.resolve(__dirname, "..", "figures");
const F = (p) => path.join(ROOT, p);
const C = AlignmentType.CENTER, LEFT = AlignmentType.LEFT;
const centre = (n, leftCols = [0]) => Array.from({ length: n }, (_, i) => (leftCols.includes(i) ? LEFT : C));

function appA() {
  return [
    H1("Appendix A. Raw Maze data", { pageBreak: true }),
    P("The Maze study \"Kowloon_bus_app_Maze_user_testings\" had 9 responses and 21 blocks. Its full report is online (Appendix C) and as a 50-page PDF export. Maze's per-participant export, 21 CSV files with one per block, is included in the submission folder **raw_data/**. Each task file has one row per tap, with the participant's start and end time, device, operating system, browser, path, time on each screen, and the target and position of every tap; each question file has one row per participant. Every total in the export matches the Maze report. P1 to P9 are numbered by start time; times are Hong Kong time."),
    ...figure(F("final/maze-p-01.png"), 15, "Figure A.1", "Maze report, page 1: study overview (9 responses, 21 blocks, usability score 71)."),
    ...figure(F("final/maze-p-13.png"), 15, "Figure A.2", "Maze report, page 13: overview of the save mission (block 6)."),
    ...figure(F("final/maze-p-14.png"), 15, "Figure A.3", "Maze report, page 14: success metrics for the save mission, with 22.2% on the expected path."),
    caption("Table A.1", "Participant profile (from the User Researcher's participant sheet and the Maze export)."),
    table(["P", "Maze tester ID", "Age", "Device", "OS · browser (export)", "Date", "Start–end", "Study time"], [
      ["P1", "607053489", "19", "Phone", "Android · WeChat", "5 Nov", "20:20–20:31", "10.5 min"],
      ["P2", "607067413", "48", "Laptop", "Mac OS · WeChat", "5 Nov", "20:34–20:53", "18.2 min"],
      ["P3", "607074633", "20", "Phone", "Android · WeChat", "5 Nov", "20:42–20:53", "10.9 min"],
      ["P4", "607092204", "45", "Laptop", "Mac OS · Chrome", "5 Nov", "21:19–21:28", "9.2 min"],
      ["P5", "607462892", "19", "Laptop", "Windows · Chrome", "6 Nov", "11:21–11:28", "6.9 min"],
      ["P6", "607587743", "19", "Laptop", "Windows · Chrome", "6 Nov", "19:43–19:51", "7.6 min"],
      ["P7", "608091492", "19", "Laptop", "Windows · WeChat", "7 Nov", "13:19–13:41", "22.4 min"],
      ["P8", "608092742", "19", "Tablet", "iPad · Safari", "7 Nov", "13:24–13:31", "6.7 min"],
      ["P9", "607192590", "18", "Phone", "iOS · Instagram", "7 Nov", "19:29–19:36", "7.2 min"],
    ], [1.0, 2.6, 1.2, 1.7, 3.6, 1.6, 2.6, 2.1], { align: centre(8, [4]) }),
    caption("Table A.2", "Result of each mission for each participant (D = direct, I = indirect, ✗ = gave up). Clicks and misclicks are totals over the nine missions."),
    table(["P", "Device", "1", "3", "6", "7", "9", "12", "14", "15", "18", "D / I / ✗", "Clicks", "Misclicks"], [
      ["P1", "Phone", "D", "D", "I", "D", "D", "I", "I", "D", "I", "5 / 4 / 0", "67", "46"],
      ["P2", "Laptop", "D", "D", "I", "D", "D", "D", "D", "D", "D", "8 / 1 / 0", "48", "24"],
      ["P3", "Phone", "D", "D", "✗", "I", "I", "I", "I", "D", "D", "4 / 4 / 1", "91", "59"],
      ["P4", "Laptop", "D", "D", "D", "D", "D", "D", "D", "D", "D", "9 / 0 / 0", "19", "1"],
      ["P5", "Laptop", "D", "D", "I", "D", "D", "D", "D", "D", "D", "8 / 1 / 0", "34", "15"],
      ["P6", "Laptop", "D", "D", "D", "D", "D", "I", "D", "D", "D", "8 / 1 / 0", "27", "8"],
      ["P7", "Laptop", "D", "D", "I", "D", "D", "D", "D", "✗", "D", "7 / 1 / 1", "42", "20"],
      ["P8", "Tablet", "D", "D", "I", "D", "D", "I", "D", "D", "I", "6 / 3 / 0", "69", "33"],
      ["P9", "Phone", "D", "D", "I", "✗", "D", "I", "I", "D", "I", "4 / 4 / 1", "64", "34"],
      ["**All**", "", "9 D", "9 D", "2 D", "7 D", "8 D", "4 D", "6 D", "8 D", "6 D", "**59 / 19 / 3**", "461", "240"],
    ], [1.0, 1.5, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 2.2, 1.4, 1.6], { size: 15, align: centre(14, [0, 1]) }),
    caption("Table A.3", "Comprehension answers (✓ = correct; otherwise the answer given) and ratings for each participant. RE = Really easy, E = Easy, M = Moderate, LD = A little difficult; G = Good, VG = Very good."),
    table(["P", "2 Bus 8", "4 Route 8", "10 Walk", "13 First", "16 QEH", "19 Bus 116", "Correct", "5 Read", "8 Save", "11 Search", "17 Nearby", "20 Text", "21 All"], [
      ["P1", "✓", "✓", "28 min", "✓", "✓", "✓", "5/6", "E", "E", "E", "E", "E", "G"],
      ["P2", "✓", "✓", "28 min", "✓", "✓", "✓", "5/6", "RE", "M", "E", "E", "RE", "G"],
      ["P3", "✓", "✓", "✓", "✓", "✓", "✓", "6/6", "E", "LD", "RE", "RE", "RE", "G"],
      ["P4", "✓", "✓", "✓", "✓", "✓", "✓", "6/6", "E", "RE", "RE", "E", "E", "G"],
      ["P5", "✓", "✓", "28 min", "✓", "✓", "✓", "5/6", "RE", "E", "RE", "M", "M", "G"],
      ["P6", "✓", "5 min", "28 min", "✓", "✓", "✓", "4/6", "RE", "RE", "RE", "RE", "RE", "VG"],
      ["P7", "✓", "✓", "28 min", "✓", "✓", "✓", "5/6", "RE", "RE", "E", "M", "RE", "G"],
      ["P8", "✓", "✓", "✓", "✓", "✓", "✓", "6/6", "M", "LD", "E", "RE", "RE", "G"],
      ["P9", "✓", "5 min", "28 min", "No.8", "✓", "✓", "3/6", "E", "M", "E", "E", "M", "G"],
      ["**All**", "9/9", "7/9", "3/9", "8/9", "9/9", "9/9", "**45/54**", "", "", "", "", "", ""],
    ], [0.9, 1.15, 1.3, 1.3, 1.15, 1.15, 1.4, 1.3, 1.05, 1.05, 1.25, 1.3, 1.1, 1.1], { size: 14, align: centre(14) }),
    caption("Table A.4", "Save mission (block 6): each participant's path, misclicks and rating of how easy saving was (block 8)."),
    table(["P", "Path (screen codes)", "Screens", "Misclicks", "Result", "Rating"], [
      ["P4", "F1 → F1A → F2 → F2A", "4", "1", "Direct", "Really easy"],
      ["P6", "F1 → F1A → F2 → F2A", "4", "0", "Direct", "Really easy"],
      ["P7", "F1 → F1B → F2 → F2A", "4", "1", "Indirect, via Saved", "Really easy"],
      ["P5", "F1 → F1A → F1B → F2 → F2A", "5", "0", "Indirect, via Saved", "Easy"],
      ["P1", "F1 → F1A → F1 → F1A → F2 → F2A", "6", "1", "Indirect", "Easy"],
      ["P2", "F1 → F3 → F3A → F3 → F1 → F1B → F1 → F1B → F2 → F2A", "10", "15", "Indirect, via Trip and Saved", "Moderate"],
      ["P9", "F1 → F1A → F1 → F1A → F1 → F1A → F1 → F1A → F2 → F2A", "10", "0", "Indirect", "Moderate"],
      ["P8", "F1 → F4C → F4A → F4B → F4 → F4C → F4 → F4C → F4 → F1B → F4 → F3 → F1 → F4 → F4A → F1B → F2 → F2A", "18", "23", "Indirect, via Nearby, map and Saved", "A little difficult"],
      ["P3", "F1 → F4A → F4 → F4A → F4C → F4A → F4 → F4C → F4A", "9", "32", "Gave up", "A little difficult"],
    ], [0.9, 8.0, 1.4, 1.6, 3.0, 2.1], { size: 15, align: [C, LEFT, C, C, LEFT, LEFT] }),
  ];
}

const EASE = "\"The question does not have any right answers. Follow your heart.\" Scale: Really Easy, Easy, Moderate, A Little Difficult, Really Difficult.";
function appB() {
  return [
    H1("Appendix B. Task script", { pageBreak: true }),
    P("The wording below is copied from the Maze study, including its spelling. Multiple-choice options are listed as they appear in the Maze report."),
    table(["Block", "Type", "Title", "Text shown to participants"], [
      ["1", "Mission", "Let's get started!", "\"Please tap the start button to have a try on the app.\" \"Remember to turn on the location info while using the app!\" \"(You can only use English for the app testing.)\""],
      ["2", "Question", "When will the next Bus No.8 arrive?", "\"You want to take Bus No.8. Please find out when the next Bus No.8 will arrive.\" Options: After 5 min; After 12 min; After 3 min; After 9 min; I didn't find the answer."],
      ["3", "Mission", "Take a ride on Bus No.8", "\"Now you're already on Bus No.8, and you wonder how long it will take from the first station to terminal. Please find out the right answer.\""],
      ["4", "Question", "How long does it take from the first station to terminal?", "\"Select the number you just read from the No.8 bus info.\" Options: 27 min; 5 min; 12 min; 19 min; I didn't find the answer."],
      ["5", "Rating", "Is it easy for you to read infos of buses?", EASE],
      ["6", "Mission", "Save Cross Harbour Tunnel Station", "\"You often travelled to Cross Harbour Tunnel Station before. Now you're again at the station, and you decide to save the station as you may use the infos frequently. Please save the station in Bus No.8 infos.\""],
      ["7", "Mission", "Have a check of your saved stations", "\"Please check the station you just saved (there are already some default saved buses and stations just for app testings.)\""],
      ["8", "Rating", "Is it easy for you to save a station?", EASE],
      ["9", "Mission", "From Hung Hom Station to Argyle Centre", "\"You are right now at Hung Hom Station, and you have no idea how to get to Argyle Centre.\" \"Please search the recommended route from Hung Hom Station to Argyle Centre.\""],
      ["10", "Question", "What's the recommended bus number and how long will you walk to get to the destination?", "\"Please read the infos given in the searching results to plan for the trip.\" Options: 87D, 28 min; 87D, 2 min; 87D, 6 min; 87D, 6.4 min; I didn't find the answer."],
      ["11", "Rating", "Is it easy for you to search a route?", EASE],
      ["12", "Mission", "Find bus stations nearby", "\"You are right now close to Hung Hom Station, and you want to catch the bus at a station close to you.\" \"Please find out the nearest bus and see the details of the bus using \"Nearby\" function.\""],
      ["13", "Question", "Which bus arrives first?", "\"According to the detailed infos you read, find out which bus comes first at the station neareast [sic] to you.\" Options: Bus No.101; Bus No.8; Bus No.11K; Bus No.116; I didn't find the answer."],
      ["14", "Mission", "Use a map and take a look around", "\"In \"Nearby\", please turn on the map and see your location.\""],
      ["15", "Mission", "Find landmarks around me", "\"Find out the landmarks around you using \"Nearby\" function.\""],
      ["16", "Question (multiple answers)", "Which bus can take you to Queen Elizabeth Hospital?", "\"Find out the bus number(s) that can take you to Queen Elizabeth Hospital. This question may have one or more right answers.\" Options: No. 11K; No. 116; No. 8; No. 5C; No. 87D; I didn't find the answer."],
      ["17", "Rating", "Is it easy for you to use \"Nearby\" function?", EASE],
      ["18", "Mission", "Adjust the size of texts", "\"The text on the home screen is too small for you to read comfortably. Make it the largest (200%), then return to the home screen and check when the next Bus No.116 arrives.\""],
      ["19", "Question", "When will the next Bus No.116 arrive?", "\"Read the infos in the Homepage with larger text size.\" Options: After 9 min; After 12 min; After 5 min; After 3 min; I didn't find the answer."],
      ["20", "Rating", "Is it easy for you to adjust size of texts?", EASE],
      ["21", "Rating", "Overall, how do you feel about the new version of Kowloon Bus?", "\"This is the last question of the test. The majority of the app's functions are included in the tests. The question does not have any right answers. Follow your heart.\" Options: Very Good; Good; Moderate; Bad; Really Bad."],
    ], [1.2, 2.1, 4.4, 9.3], { size: 15, align: [C, LEFT, LEFT, LEFT], split: true }),
  ];
}

function appC() {
  return [
    H1("Appendix C. Figma and Maze links", { pageBreak: true }),
    table(["Item", "Link and notes"], [
      ["Figma design file", `[[${FIGMA}|${FIGMA}]]\nOpens on the page \"App Screens · English en-GB\", the version tested and shown in this report. The file also holds the Traditional Chinese page, the components and the boards comparing the original app with the redesign.`],
      ["Clickable prototype", `[[${PROTO}|${PROTO}]]\nStarts the flow \"First launch (en-GB)\" at the welcome screen (O1). Shown in the iPhone 18 Pro device frame; arrival times are simulated.`],
      ["Maze report", `[[${MAZE}|${MAZE}]]\nFull online report, including each mission's navigation overview.`],
    ], [3.4, 13.6], { size: 16, boldFirst: true }),
  ];
}

function appD() {
  return [
    H1("Appendix D. Accessibility audit of the existing app", { pageBreak: true }),
    P("Our Accessibility & Evaluation Lead audited App1933 v2.3.38 for iOS, run on a Mac at the size of a 375 × 667 pt iPhone screen with the interface in Traditional Chinese, against four WCAG basics: contrast, target size, text scaling and screen-reader support (W3C, 2024). The contrast checks were repeated on iPhone screenshots of v2.3.39 taken on 8 November 2026, and every failure found on the Mac appeared on the phone with the same ratio to within 0.05. Contrast was measured on the screenshots with the WCAG relative-luminance formula. Target sizes were read from the app's accessibility tree where exposed, otherwise measured on the screenshots, and converted to iOS points. Text scaling was tested on the iPhone with the system text size at its maximum. Screen-reader support was judged by listing what each main screen exposes to assistive technology; we did not run a VoiceOver session."),
    caption("Table D.1", "Audit results."),
    table(["#", "Check", "WCAG", "Result"], [
      ["1", "Body text, stop names, fares, arrival times, tab labels", "1.4.3", "**Pass.** Near-black on white, 14.7:1 to 21:1; blue arrival minutes 9.4:1 and 10.6:1; selected red tab label 6.0:1."],
      ["2", "White text on the red header", "1.4.3", "**Pass, narrowly.** 4.84:1 on the Mac build; 4.60:1 on the iPhone."],
      ["3", "Search placeholder, the only hint of what to type", "1.4.3", "**Fail.** #DBDBDB on white, 1.38:1 (iPhone 1.36:1)."],
      ["4", "Nearby mode buttons and empty-state message", "1.4.3", "**Fail.** Unselected buttons white on #BABBBB, 1.92:1 (working buttons, so not exempt); empty-state message 1.66:1."],
      ["5", "White text on the slate section bars", "1.4.3", "**Fail, narrowly.** 4.37:1."],
      ["6", "Unused letters on the stop-code keypad", "1.4.3", "**Exempt.** 1.35:1, but the keys are disabled."],
      ["7", "Icons against their background", "1.4.11", "**Pass.** 4.37:1 to 13.0:1."],
      ["8", "Touch-target size", "2.5.8; Apple 44 pt", "**Mixed.** Tabs, menu cells and keypad keys are 44 pt or more. Route header icons (29 pt) and the four stop action icons (26 pt) meet 24 pt but not 44 pt. The planner's star (about 17 pt, inside a tappable row) fails 2.5.8. The skip button on the launch advert is roughly 22–25 pt and is the only way past it."],
      ["9", "Text scaling", "1.4.4", "**Fail.** No text-size setting among the 26 menu items, and the app ignores the iPhone's text size: at the maximum setting, Home text is the same size to the pixel (Figure D.2). Text is already cut off in four places at the default size."],
      ["10", "Screen-reader names and roles", "1.1.1, 4.1.2", "**Fail (by inspection).** Tabs, the 26 menu items and the language options are exposed with names. Route rows, stop lists, keypads and every icon-only button are not exposed in our inspection. \"Close\" in the menu is exposed as text, not as a button, and the search box as static text, not a text field."],
    ], [0.7, 4.6, 2.2, 9.5], { size: 15, align: [C, LEFT, LEFT, LEFT] }),
    ...figure(F("audit/appendix-d-contrast-targets.png"), 16, "Figure D.1", "Contrast failures and small targets in App1933 v2.3.38. Red boxes are contrast failures, green is a pass, and blue marks measured targets."),
    ...figure(F("audit/appendix-d-text-scaling.png"), 16, "Figure D.2", "App1933 ignores the iPhone's text size: (a) Home before the change; (b) Larger Text with Larger Accessibility Sizes on and the slider at its maximum; (c) Home at that setting, with every measured text box the same size as in (a)."),
    caption("Table D.2", "What each main screen exposes to assistive technology (accessibility-tree inspection)."),
    table(["Screen", "Exposed (name · role)", "Not exposed"], [
      ["Home", "APP 1933 · text; six tab buttons", "Route rows, banner, location prompt, weather, fare button, trip-planner button"],
      ["Route detail", "\"Go back\" · button (in English, in a Chinese interface); stop markers on the map", "Header icons, stop list, arrival times, stop action icons"],
      ["More menu", "26 items · button; Close · text, with no button role", "—"],
      ["Language dialog", "繁體中文, 简体中文, English · button", "No cancel option exists"],
      ["Search", "Search · text; placeholder · text (should be a text field)", "Keypad, results"],
      ["Nearby", "Nearby · text", "Instruction, stop-code keypad, mode buttons"],
      ["Saved", "Saved · text", "Saved stop row, arrival time, edit button"],
    ], [3.0, 7.2, 6.8], { size: 15, boldFirst: true }),
    P("The app is built with React Native, which passes accessibility information to iOS; we read that information on a Mac rather than listening to VoiceOver on an iPhone. VoiceOver may read more than the Mac shows, for example the text inside a route row, so the \"not exposed\" list is an upper bound. The icon-only controls have no text inside them to fall back on, so their missing labels are the most secure part of this finding.", { before: 120 }),
    P("**How the redesign responds.** Secondary text is #696969 or darker (5.49:1), containers are neutral grey with ink text, and red is kept for the header, route badges, primary buttons and the active tab (Section 3.6). No linked element is under 24 pt and 86% reach 44 pt, with a 44 pt ☆ on every stop (Section 3.7). Text size has its own control under More (F5). The four bare icons in route detail become three labelled tools and a labelled save button (F2). Screen-reader labels cannot be built in a Figma prototype and remain future work."),
  ];
}

function appE() {
  return [
    H1("Appendix E. Extra screen captures", { pageBreak: true }),
    ...figure(F("annotated/F3b-pick-location-annotated.png"), 15.5, "Figure E.1", "Picking a starting place in the existing planner (iPhone, v2.3.39): the origin starts as \"null\", then region, district and area, then the map and a confirm button."),
    ...figure(F("final/figE-all-screens.png"), 17, "Figure E.2", "All 32 screens of the English prototype (31 core screens and Home at the largest text size)."),
  ];
}

module.exports = { appA, appB, appC, appD, appE };

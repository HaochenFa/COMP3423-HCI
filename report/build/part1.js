// Cover page, 1 Introduction, 2 Related Work
const L = require("./lib");
const { D, P, H1, H2, bullets, table, caption, spacer, runs, FONT, INK, INK2, RED } = L;
const { Paragraph, TextRun, AlignmentType, BorderStyle } = D;

const FIGMA = "https://www.figma.com/design/2JkOkm1pztoaZask0fDJeq/APP1933-KMB.LWB-Redesign?node-id=0-1";
const PROTO = "https://www.figma.com/proto/2JkOkm1pztoaZask0fDJeq/APP1933-KMB.LWB-Redesign?node-id=26-1387&starting-point-node-id=26%3A1387";
const MAZE = "https://app.maze.co/report/Kowloon_bus_redesign/oBtJvOVQD-qXRtWj33TtgofbHD7gVvM9/intro";

function cover() {
  const line = (text, size, o = {}) => new Paragraph({
    children: runs(text, { size, color: o.color || INK, bold: o.bold }),
    spacing: { before: o.before || 0, after: o.after ?? 0, line: o.line || 276 },
    alignment: AlignmentType.LEFT,
    border: o.rule ? { bottom: { style: BorderStyle.SINGLE, size: 12, color: RED, space: 8 } } : undefined,
  });
  return [
    line("COMP3423 Human Computer Interaction  ·  Group Project Report", 19, { color: INK2, before: 600, after: 360 }),
    line("Re-designing App1933", 52, { bold: true, after: 120, line: 240 }),
    line("A new mobile interface for KMB and LWB bus passengers, built around one question: when is my bus coming?", 26, { color: INK2, after: 360, rule: true, line: 300 }),
    line("**Group A21**", 21, { before: 240, after: 40 }),
    line("The Hong Kong Polytechnic University  ·  Semester 1, 2026/27  ·  Submitted 15 November 2026", 19, { color: INK2, after: 600 }),
    new Paragraph({ children: runs("**Workload declaration**", { size: 22 }), spacing: { after: 100 } }),
    table(["Name", "SID", "Role", "Key tasks"], [
      ["Haochen Fa*", "24113347D", "Project Lead & UX Strategist", "Timeline and coordination; expanded the first design into the full bilingual screen set (Table 5.4); HCI-principle mapping (Table 3.1); Introduction and Conclusion (Sections 1, 6); final QA"],
      ["Chenyang Zhang", "25091317D", "User Researcher", "Target users and dual-track journey map (Section 3.2, Figure 3.1); Maze test design, recruitment and running; Testing section (Section 5); Appendices A and B"],
      ["Xulu Zhang", "{{SID}}", "Interaction Designer", "Information architecture and site map (Section 3.3, Figure 3.2); prototype structure, states and variables (Table 5.4, 2 Nov); walkthrough (Section 3.4, Figure 3.3)"],
      ["Li-En Lo", "24109751D", "Visual & UI Designer", "Wireframe sketch and first high-fidelity screens (Figure 5.2, v1); visual language and style guide (Section 3.6, Figure 3.4); PPT design"],
      ["Moling Kong", "24103622D", "Accessibility & Evaluation Lead", "Heuristic evaluation of the existing app (Section 4); accessibility audit (Appendix D); accessibility accommodations and 200% checks (Section 3.7; Table 5.4, 3–5 Nov)"],
    ], [3.0, 2.1, 3.5, 8.4], { size: 17 }),
    new Paragraph({ children: runs("* Group leader", { size: 16, color: INK2 }), spacing: { before: 60, after: 480 } }),
    new Paragraph({ children: runs("**Links** (publicly viewable)", { size: 22 }), spacing: { after: 100 } }),
    table(["", ""], [
      ["Figma design file", `[[${FIGMA}|${FIGMA}]]`],
      ["Clickable prototype", `[[${PROTO}|Prototype, flow "First launch (en-GB)"]]`],
      ["Maze report", `[[${MAZE}|${MAZE.replace("https://", "")}]]`],
    ], [3.2, 13.8], { size: 16, boldFirst: true, noHeader: true }),
  ];
}

function intro() {
  return [
    H1("1. Introduction", { pageBreak: true }),
    H2("1.1 The application and its context"),
    P("App1933 is the official mobile app of Kowloon Motor Bus (KMB) and Long Win Bus (LWB). KMB runs bus routes across Kowloon and the New Territories, and LWB runs routes to North Lantau and the airport. The app's job is easy to state. Most of the time, people open it to find out when their bus will arrive; less often, they look up a route, plan a trip to a place or look for a stop nearby. We studied version 2.3.38 for iOS and checked our findings on an iPhone running version 2.3.39 in November 2026."),
    H2("1.2 Target users"),
    P("We design for two groups identified in our checkpoint research (Figure 3.1):"),
    ...bullets([
      "**Older passengers.** Many do not know route numbers or stop codes, find small text hard to read, and can mistake a sudden full-screen advert for a scam. Among older Hong Kong adults, ability, confidence and anxiety predict technology use more strongly than perceived usefulness (Chen & Chan, 2014), so an app that feels unpredictable or hard to read loses this group even when it holds the information they need.",
      "**Students and daily commuters.** They are confident smartphone users, short of time and often using the phone with one hand while walking. They want their usual route and its next arrival without extra steps.",
    ]),
    H2("1.3 Problem statement"),
    P("The existing interface makes both groups work too hard for the one thing they open it for. On opening, a full-screen advert appears whose skip button is about 6% of the screen width. Home leads with a rotating promotion banner, and a floating button covers part of the arrival list. Search accepts only route numbers, so a passenger who knows the destination but not the bus cannot start. Saving a stop takes seven taps through an unlabelled ≡ icon. Arrival times on Home do not say whether they are live estimates or timetable entries. There is also no way to enlarge text: the app has no text-size setting and ignores the iPhone's own text size (Appendix D). Section 4 shows each problem in annotated screenshots of the real app."),
    H2("1.4 Why App1933"),
    P("App1933 is an everyday app in Hong Kong whose users range from secondary-school students to retirees, which makes it a fair test of designing for very different people at once. Its problems are also typical of transit apps: advertising competes with time-critical information, search follows the operator's data rather than the passenger's way of thinking, and accessibility is left to the phone."),
    H2("1.5 Scope"),
    P("We redesigned the five features in Table 1.1, one per team member. Each covers a stage of the passenger journey and is tested by at least one Maze task. The scope is realistic for five students in eight weeks because we redesign the interface, not the service. The prototype uses simulated arrival times, timetables and fares, keeps the app's existing functions, and removes only what competes with the main task: pop-up adverts and the Games tab.", { keepNext: true }),
    caption("Table 1.1", "The five redesigned features."),
    table(["Code", "Feature", "Main change", "Maze blocks"], [
      ["F1", "Home", "Saved routes first; every arrival labelled Live or Scheduled; no pop-up adverts", "2–5"],
      ["F2", "One-tap save and route detail", "44 pt ☆ on every stop; a labelled save button; Undo instead of a pop-up", "6–8"],
      ["F3", "Trip planning", "Search by place name; origin preset to the current location; corrections that are shown and can be undone", "9–11"],
      ["F4", "Nearby stops and landmarks", "Stops by street, walking time and next bus; landmarks with category and buses", "12–17"],
      ["F5", "More menu and accessibility", "Grouped settings; text size in three steps labelled 100%, 150% and 200%; high contrast; calm mode", "18–20"],
    ], [1.2, 4.0, 9.6, 2.2], { boldFirst: true }),
  ];
}

function related() {
  const dc = (t) => P("**Design consequence.** " + t, { after: 160 });
  return [
    H1("2. Related Work"),
    P("We drew on 18 sources: six on HCI theory, five on real-time transit information and intrusive interfaces, and seven on touch input, older adults and accessibility standards. Rather than summarise them one at a time, we group them by the design question they helped us answer, note where they disagree or fall short, and end each theme with the decision it led to. Table 2.1 maps every source to the features it informs."),

    H2("2.1 Real-time information and trust (F1, F4)"),
    P("Real-time arrival information helps passengers in measurable ways. In a survey of 488 users of OneBusAway in Seattle, 91% said they spent less time waiting and 92% were more satisfied with public transit (Ferris et al., 2010). At bus stops, riders without real-time information overestimated how long they had waited, while riders using it did not, and they actually waited almost two minutes less (Watkins et al., 2011). A later review finds the same pattern across many cities: shorter waits, better route choices and more use of transit (Brakewood & Watkins, 2019)."),
    P("The evidence is narrower than these figures suggest. Two of the three sources come from one project with mostly young, self-selected users. Ferris et al. also found smaller satisfaction gains among older respondents, and inaccurate data was the most common complaint. The benefit therefore depends on riders trusting the numbers, and it does not reach older riders by default. We found no peer-reviewed usability study of a Hong Kong bus app, so we treat these results as principles to transfer rather than local proof."),
    dc("F1 puts saved routes and their next arrival first and labels every time Live or Scheduled, so riders know which numbers to trust. F4 shows walking time and the next buses on each nearby stop, so riders can judge whether another stop is worth the walk."),

    H2("2.2 Interruptions, adverts and dark patterns (F1, F5)"),
    P("Edwards et al. (2002) found that forced pop-up adverts feel most intrusive when people are absorbed in a task, and that intrusiveness leads to irritation and avoidance. Opening a bus app to catch a bus is exactly that kind of moment. Gray et al. (2018) go further and classify persistent interruptions of this kind (\"nagging\") as a dark pattern, which makes them an ethical problem as well as a usability one. Guidelines for older users independently rule out pop-up and animated adverts (Zaphiris et al., 2005)."),
    P("The sources differ on what to do instead. Edwards et al. found that adverts related to the user's task felt less intrusive, so the evidence argues against forced interruption rather than against advertising as such. That matters here, because the operator earns advertising income and a design that removed every advert would not be realistic."),
    dc("F1 removes the launch advert and all pop-ups but keeps one labelled, closable \"Ad · Sponsored\" card at the end of Home. Calm mode in F5 (\"Fewer animations, ads and extras\") goes further for those who want it."),

    H2("2.3 Choice, density and redundancy (F3, F5, tab bar)"),
    P("Hick (1952) showed that choice reaction time grows with the logarithm of the number of alternatives. Nielsen's (1994) heuristic of aesthetic and minimalist design (H8) and the ageing guidelines of Zaphiris et al. (2005), which ask for fewer choices and no irrelevant information, reach similar advice from practice and from a literature review. Hick's participants, however, chose between equally likely options they had not practised. In a familiar menu, grouping and clear labels matter as much as the raw number of items, so we grouped settings under headings rather than only cutting them."),
    P("Chandler and Sweller (1991) add a caution: in their experiments, material that seemed useful but was not essential made understanding worse, even when it was well integrated. Their tasks were learning tasks rather than glances at a phone, but the warning applies to any screen that repeats information. We kept it in mind on the trip results card (F3A), which leads with the number people decide on, the total journey time, and states the walk once in the summary and once in the step list. Section 5.3 discusses whether this repetition explains the low score on the walking-time question; the evidence points more to the question's wording."),
    dc("F5 replaces 26 unsorted icons with three headed groups, and the tab bar keeps five tabs; we decline the idea of a sixth tab for the map (Section 5.3). F3A leads with the total time and lists the legs beneath it."),

    H2("2.4 Signifiers, feedback and reversible actions (F2, F3)"),
    P("Norman (2013) separates what an interface allows (affordances) from what it shows (signifiers): an action can exist and still go unused if nothing signals it. On safeguards for everyday actions, three sources agree. Shneiderman et al. (2016) include easy reversal of actions among their eight golden rules because it relieves anxiety; Nielsen's user control and freedom (H3) makes the same point; and WCAG 2.2 lists reversibility as one of three acceptable safeguards against errors (criterion 3.3.4; World Wide Web Consortium [W3C], 2024). For a low-stakes action such as saving a stop, undo is faster than a confirmation dialog and just as safe."),
    P("Undo only helps once the user has found the action, though, and our test shows the gap. Once participants reached the route screen they saved the stop without trouble, but only two of nine got there by the expected path, because the tappable route card on Home gave no sign that it led there (Section 5.3)."),
    dc("F2 gives saving two visible signifiers, a labelled \"Save this stop\" button and a ☆ on every stop, with immediate feedback and Undo instead of a dialog. F3's spelling correction says what it changed and can be reversed. We report the missing signifier on the Home card as the main weakness of our design."),

    H2("2.5 Touch targets and motor control (F2, F4, all screens)"),
    P("Fitts (1954) showed that the time to hit a target grows with its distance and falls with its size. Parhi et al. (2006) studied one-handed thumb use on small touchscreens and recommend targets of about 9.2 mm for single taps. Platform and web standards set lower bars. Apple (n.d.) gives 44 × 44 pt as the default size of an iOS control, which by our calculation is about 7.3 mm on a current iPhone Pro, and WCAG 2.2 asks for at least 24 × 24 CSS px, with 44 × 44 as the enhanced level (criteria 2.5.8 and 2.5.5; W3C, 2024). Meeting a guideline is therefore not the same as meeting the empirical recommendation. Findlater et al. (2013) found that touchscreens narrowed the speed gap between older and younger adults compared with a mouse but did not close it, and that dragging was relatively slow on touch. Their tablet lay flat on a table, an easier set-up than a phone held in one hand at a bus stop."),
    dc("F2 puts a 44 pt ☆ on every stop and a full-width save button as the larger primary target. Saving and Undo are single taps with no drag or swipe, and navigation sits in the bottom tab bar. Of the 98 linked elements on the core screens, none is smaller than 24 pt and 84 (86%) are at least 44 pt in both directions (Section 3.7)."),

    H2("2.6 Older adults, legibility and accessibility settings (F5)"),
    P("The ageing literature and the standards point the same way. Zaphiris et al. (2005) recommend larger sans-serif text, strong contrast and little motion. WCAG 2.2 asks for a contrast of 4.5:1 and text that can be resized to 200% (criteria 1.4.3 and 1.4.4). Apple (n.d.) asks apps to let people enlarge text, ideally to at least 200%, through the app's own control or the system setting, and to reduce animation when Reduce Motion is on. Chen and Chan's (2014) survey of 1,012 Hong Kong residents aged 55 and over shows why this matters beyond comfort: ability, self-efficacy and anxiety predicted technology use better than perceived usefulness, so legibility and a calm interface affect whether older passengers use the app at all."),
    P("Two cautions apply. Zaphiris et al. wrote their guidelines for desktop websites in 2005, and Czaja et al. (2019) give a whole chapter to involving older adults in design research, which our test, run in English with participants aged 18 to 48, did not do (Section 6)."),
    dc("F5 puts a text-size control (100%, 150%, 200%) at the top of More, with high contrast and calm mode beside it, and every status in the app is written out rather than shown by colour alone."),

    caption("Table 2.1", "Sources and the features they inform. Group: T = HCI theory, D = transit and interface domain, M = modality, older adults and accessibility."),
    table(["Source", "Group", "F1", "F2", "F3", "F4", "F5", "Also used in"], [
      ["Apple (n.d.)", "M", "", "●", "", "", "●", "§3.7 targets; §5.3 text size"],
      ["Brakewood & Watkins (2019)", "D", "●", "", "", "●", ""],
      ["Chandler & Sweller (1991)", "T", "", "", "●", "", "", "§5.3 walking time"],
      ["Chen & Chan (2014)", "M", "", "", "", "", "●", "§1.2 users; §6 limitations"],
      ["Czaja et al. (2019)", "M", "", "", "", "", "●", "§6 limitations"],
      ["Edwards et al. (2002)", "D", "●", "", "", "", "●", ""],
      ["Ferris et al. (2010)", "D", "●", "●", "", "●", "", "§5.3 arrivals"],
      ["Findlater et al. (2013)", "M", "", "●", "", "", "", ""],
      ["Fitts (1954)", "T", "", "●", "", "●", "", "§3.5 rationale"],
      ["Gray et al. (2018)", "D", "●", "", "", "", "", "§3.5 rationale"],
      ["Hick (1952)", "T", "", "", "", "", "●", "§5.3 map tab"],
      ["Nielsen (1994)", "T", "●", "●", "●", "●", "●", "§3.5 rationale"],
      ["Norman (2013)", "T", "", "●", "", "", "", "§5.3 saving; §6"],
      ["Parhi et al. (2006)", "M", "", "●", "", "●", "", ""],
      ["Shneiderman et al. (2016)", "T", "", "●", "●", "", "", "§3.5 rationale"],
      ["Watkins et al. (2011)", "D", "●", "", "", "", "", "§5.3 arrivals"],
      ["W3C (2024)", "M", "●", "●", "", "●", "●", "§3.7 audit; Appendix D"],
      ["Zaphiris et al. (2005)", "M", "●", "●", "●", "", "●", "§3.7 memory load"],
    ].map((r) => (r.length === 7 ? [...r, ""] : r)), [4.4, 1.3, 1.0, 1.0, 1.0, 1.0, 1.0, 6.3], { size: 15, align: [0, 1, 1, 1, 1, 1, 1, 0].map((c) => (c ? AlignmentType.CENTER : AlignmentType.LEFT)) }),
  ];
}

module.exports = { cover, intro, related, FIGMA, PROTO, MAZE };

// 5 Testing, 6 Conclusion, References
const path = require("path");
const L = require("./lib");
const { D, P, H1, H2, bullets, table, caption, figure, runs, FONT, INK } = L;
const { Paragraph, AlignmentType } = D;

const ROOT = path.resolve(__dirname, "..", "figures");
const F = (p) => path.join(ROOT, p);
const C = AlignmentType.CENTER, LEFT = AlignmentType.LEFT;

function testing() {
  return [
    H1("5. Testing Method, Results and Discussion"),
    H2("5.1 Method"),
    P("**Participants and recruitment.** Nine people took part between 5 and 7 November 2026 (Appendix A, Table A.1). They were classmates, friends and relatives of the team, contacted by direct message. Ages ranged from 18 to 48 (median 19): seven were aged 18 to 20, and two were 45 and 48. Five used a laptop, three a phone and one a tablet. Nine is above the brief's minimum of five and suits a formative test, whose aim is to find problems rather than to estimate rates for a population. No participant was aged 60 or over, although older passengers are one of our two target groups; Section 6 returns to this."),
    P("**Set-up and tasks.** We imported the English prototype into Maze as a study of 21 blocks: nine prototype missions, each with one expected path; six comprehension questions with fixed correct answers; five ease ratings; and one overall rating (Table 5.1; full wording in Appendix B). The test ran in English. The tested page uses plain navigation links, so only designed routes respond, and a tap on anything else (a map pin, a language button on the welcome screen, a filter that is already selected) counts as a misclick. Block 18 tests an accessibility accommodation directly: participants enlarge the text to the largest step and then read an arrival time at that size."),
    P("**Procedure.** Participants opened the Maze link on their own device and did the test alone, remotely and without a moderator. Study time ranged from 6.7 to 22.4 minutes (median 9.2). Every session started after the design's last save, on 5 November at 17:56. Maze recorded no open-text answers. Afterwards, some participants talked to our User Researcher about the design, and the researcher's notes of those conversations are the source of the comments quoted below. They are notes rather than recordings, and not every participant took part."),
    P("**Metrics.** For each mission Maze reports the success rate, the share who succeeded by the expected path (direct success; any other successful route counts as indirect), the misclick rate, the mean time and a usability score from 0 to 100. Maze's mean time leaves out anyone who gave up. We add comprehension accuracy, the ease ratings, and each participant's path and taps from Maze's export, which also gives medians.", { keepNext: true }),
    caption("Table 5.1", "Maze missions, the features they test and the questions that followed them."),
    table(["Block", "Mission (Maze title)", "Feature", "Follow-up questions (block)"], [
      ["1", "Let's get started!", "O1–O2", "—"],
      ["3", "Take a ride on Bus No.8", "F1", "Next Bus 8 (2, asked before the mission); route 8 journey time (4); ease (5)"],
      ["6", "Save Cross Harbour Tunnel Station", "F2", "Ease of saving (8)"],
      ["7", "Have a check of your saved stations", "F2, F1", "—"],
      ["9", "From Hung Hom Station to Argyle Centre", "F3", "Recommended bus and walking time (10); ease (11)"],
      ["12", "Find bus stations nearby", "F4", "Which bus arrives first (13)"],
      ["14", "Use a map and take a look around", "F4", "—"],
      ["15", "Find landmarks around me", "F4", "Buses to Queen Elizabeth Hospital (16); ease of Nearby (17)"],
      ["18", "Adjust the size of texts", "F5", "Next Bus 116 at 200% (19); ease (20); overall rating (21)"],
    ], [1.3, 6.0, 1.7, 8.0], { align: [C, LEFT, LEFT, LEFT] }),

    H2("5.2 Results"),
    P("All nine participants finished the study. Across the nine missions there were 59 direct successes, 19 indirect successes and 3 give-ups, each by a different participant. Maze's overall usability score was 71 out of 100, and all nine rated the redesign Good (8) or Very Good (1). Table 5.2 gives the mission metrics, and Figure 5.1 shows the outcomes, comprehension and ease ratings. Comprehension was 45 of 54 answers correct (83%)."),
    caption("Table 5.2", "Mission metrics (n = 9). Mean time leaves out participants who gave up; medians are our calculation over all nine from the export."),
    table(["Block · mission", "Success", "Expected path", "Misclick", "Mean (s)", "Median (s)", "Score"], [
      ["1 · Onboarding", "100%", "100%", "73.5%", "33.1", "28.7", "91"],
      ["3 · Read Bus 8 information", "100%", "100%", "25.0%", "16.5", "11.9", "84"],
      ["6 · Save a stop", "88.9%", "22.2%", "54.5%", "38.3", "22.8", "43"],
      ["7 · Check saved stops", "88.9%", "77.8%", "61.7%", "6.3", "5.8", "83"],
      ["9 · Plan a trip", "100%", "88.9%", "55.8%", "31.3", "23.9", "68"],
      ["12 · Find nearby stops", "100%", "44.4%", "38.7%", "31.2", "18.7", "44"],
      ["14 · Use the map", "100%", "66.7%", "15.4%", "17.2", "10.6", "78"],
      ["15 · Find landmarks", "88.9%", "88.9%", "60.6%", "10.6", "9.2", "76"],
      ["18 · Adjust text size", "100%", "66.7%", "37.3%", "31.6", "25.8", "71"],
    ], [5.0, 1.8, 2.4, 1.9, 1.9, 2.1, 1.9], { align: [LEFT, C, C, C, C, C, C] }),
    ...figure(F("final/fig5-1-results.png"), 16, "Figure 5.1", "(a) Outcome of each mission; (b) comprehension questions answered correctly; (c) ease ratings. Source: Maze report and export."),
    P("Phone users found the expected path less often. In blocks 3 to 18, the three phone users went direct in 10 of 24 tasks and the five laptop users in 35 of 40, and two of the three give-ups were on phones. Most misclicks were taps on elements that were not linked on the test page: 34 of the 50 on the welcome screen were on the language buttons, three of the five on the Nearby list were on the filter already in use, and nine of the eleven on the 200% screen were on the dimmed A+ button and the calm-mode switch. The clearest exception was the save mission, where three participants tapped the stop card on Home 13 times.", { keepNext: true }),
    caption("Table 5.3", "Participants' comments, as written down by the User Researcher after the sessions (verbatim from the notes)."),
    table(["Mission", "Outcome", "Comment"], [
      ["Save a stop", "Gave up / indirect", "\"Not intuitive. Don't know that the station inside the column is interactive and can therefore lead to the saving process of target station.\""],
      ["Save a stop", "Indirect", "\"Thought the stations can be searched then saved.\""],
      ["Check saved", "Gave up", "\"The 'Saved' button was obstructed by the bottom of the instructions.\""],
      ["Check saved", "Indirect", "\"Thought the saved stations can directly be checked in 'My Favorite' column in the home page.\""],
      ["Plan a trip", "Indirect", "\"Thought Search function should be bound with Map function.\""],
      ["Nearby stops", "Indirect", "\"Didn't pay attention to the buttons at the bottom. Thought the stations can be checked through the map.\""],
      ["Use the map", "Indirect", "\"Forgot the small Map View button at the home page. Thought the map can be opened through an obvious button hidden inside the buttons underneath.\""],
      ["Landmarks", "Gave up", "\"Thought the landmarks should be found on Map, but failed to click anything because of no responses from the app (This is normal because it is just a prototype with certain testing routes).\""],
      ["Text size", "Indirect", "\"Don't know they need to enter 'More' page to adjust text size.\""],
      ["Text size", "Indirect", "\"Thought the text size can be pinched open, but tapped Map View by accident and thus entered Map page.\""],
    ], [2.4, 2.6, 12.0], { size: 15 }),

    H2("5.3 Discussion"),
    P("**Reading bus times works.** Once on the right screen, participants read what they needed: the next Bus 8 (9 of 9), the first bus at the nearest stop (8 of 9), both buses to Queen Elizabeth Hospital (9 of 9) and the next Bus 116 at the largest text size (9 of 9). Reading Bus 8's information was also the only mission besides onboarding with no misses at all, and eight of nine rated reading bus information Easy or Really easy. This supports the central decision of F1, putting saved routes and their next arrival first with a Live label, and agrees with the literature on real-time information (Section 2.1)."),
    P("**The way into saving is our main weakness.** Saving a stop had the lowest expected-path rate (2 of 9), the lowest score (43) and the only \"A little difficult\" ratings in the study. Maze's navigation paths show where people went. Five expanded the route 8 card on Home, but only two went straight on from it to the route screen: two collapsed it and expanded it again before going on, and one left for Saved. Of the eight who eventually reached that screen, four came from the Home card and four by opening route 8 in Saved. The ratings follow the paths: everyone who needed six screens or fewer rated saving Easy or Really easy, and the four who needed nine or more, or gave up, rated it Moderate or A little difficult (Appendix A, Table A.4). The first comment in Table 5.3 names the cause. The expanded card was tappable, but apart from a small text link nothing on it signalled that it led to saving: a missing signifier, in Norman's (2013) terms. Several participants also looked for the stop where stops appear (the stop card on Home, Nearby, the map, search), and none of these leads to saving. Once on the route screen, saving worked. We accept this finding, and it shapes our future direction (Section 6)."),
    P("**The two duration questions mostly measured their wording.** Seven of nine gave the 27-minute journey time for route 8; the other two answered \"5 min\", the next-bus countdown. Only three of nine gave the 2-minute walk in the trip question; the other six chose 28 minutes, the total. We report both results in full, but we do not think they show that the screens are confusing. Block 4 asked participants to \"select the number you just read from the No.8 bus info\", and the number they had just read, in block 2, was the five-minute wait. Block 10 asked \"how long will you walk to get to the destination\", which can fairly be read as asking for the whole trip, and 28 minutes is exactly the value labelled \"Total trip\". On both screens the duration in question is labelled: \"Full route 27 min\" on the card, and \"Walk 2 min\" as a chip and again in the first step. All nine chose the right bus, 87D, and all nine rated route search Easy or Really easy. One participant asked for \"a page with less distracting or redundant information\", and Chandler and Sweller's (1991) work on redundancy is a reason to take that seriously: if a later test showed that the repeated walking time costs accuracy, the step list could start collapsed. For now we keep the layout, which follows mainstream journey planners, and propose two small changes: relabel \"Full route\" as \"Journey time\", closer to the Chinese 全程需時, and ask \"How many minutes do you walk before boarding?\" in the next test."),
    P("**Most indirect results used designed routes, and two failures came from the test set-up.** Maze counts any route other than the single expected path as indirect, even a shorter one. In the Nearby mission, all five indirect participants used routes we designed: four went through the map, and one tapped route 101 in Home's own nearby section, which is shorter than the expected path. The 67% misclick rate on the Nearby list is mostly not navigation error, since three of its five misclicks were taps on the filter already in use. The landmarks failure came from a participant who spent 18 taps on map pins and labels, which were not linked on the test page. In the check-saved mission, the participant who gave up was on an iPhone and said Maze's instruction panel hid the Saved tab. The path fits, although the same participant used the tab bar later, so we call this a probable artefact. The onboarding misclick rate (73.5%) is also an artefact: all 50 misclicks were on the welcome screen, mostly on the unlinked language buttons, and one participant made 32 of them."),
    P("**Where feedback asks us to break conventions, we keep the design.** Two participants did not expect text size under More, and one tried to pinch the screen. Yet seven of nine tapped More as their very first move, and all nine finished. Text size sits in an app's settings on iOS and Android and in almost every app; pinch-to-zoom is a convention for maps, photos and web pages, not app interfaces; and a built app would also follow the phone's own text size. Likewise, one participant wanted the map built into search, and others reached nearby stops through the map. A list shows time, fare and transfers that a map hides, and the map is already one tap from Home and from Nearby: eight of nine reached it in one or two taps. We accept that the Map view link on Home has little visual weight, but a sixth tab for a secondary task would add a choice to every screen (Hick, 1952)."),
    P("**Reading the numbers with care.** Satisfaction was uniformly positive, but participants were peers and relatives who may rate a friend's design kindly, and the Maze score penalises alternative routes and taps on unlinked areas, so it partly measures prototype fidelity. We therefore give more weight to what participants did than to how they rated it. The phone-laptop gap rests on three phone users and this data cannot explain it, but the app is meant for phones, so the expected-path rates may be optimistic."),

    H2("5.4 Iteration evidence"),
    P("The design was frozen on 5 November at 17:56, before the first Maze session that evening, so no screen changed in response to the Maze results. The design did change several times before the test, and Figma's version history records each step (Table 5.4). Figure 5.2 shows one frame, the English route results screen, at three dates. The final step, an accessibility pass on the arrival rows, followed our own 200% acceptance check on 3 November: it is iteration after an expert review rather than after user testing. The changes we would make in response to the Maze results are proposed in Table 5.5.", { keepNext: true }),
    caption("Table 5.4", "Design timeline, from the project files and Figma's version history (times HKT)."),
    table(["Date (2026)", "Owner", "What changed"], [
      ["1 Oct", "Chenyang Zhang", "Dual-track user journey map"],
      ["11–12 Oct", "Li-En Lo; all", "Hand-drawn wireframe sketch redrawn as a digital wireframe; mid-project checkpoint"],
      ["28 Oct, 14:39", "Li-En Lo", "**v1:** first high-fidelity design, 13 screens at 390 × 844"],
      ["28 Oct, 15:18–15:53", "Haochen Fa", "Expanded to the full flow: 28 screens, each in Chinese and English; first prototype links; visual clean-up (no tinted badges, red reserved for actions)"],
      ["29–30 Oct", "Haochen Fa", "**v2:** separate Chinese and English pages; 150%, 200% and high-contrast states (31 screens per language); resized to 402 × 874; official logo; floating language button removed"],
      ["2 Nov", "Xulu Zhang", "Variables for text size, contrast, language and state; 111 frames of dialogs, full routes, search and alerts (142 frames on the Chinese page)"],
      ["3 Nov", "Moling Kong", "200% acceptance-check frames on both pages"],
      ["5 Nov, 16:14–17:56", "Moling Kong", "**Final:** arrival rows reworked on 15 Chinese and 14 English screens (Live/Scheduled badge beside the minutes, taller route rows and arrival blocks). Last save before testing"],
      ["5–7 Nov", "Chenyang Zhang", "Maze test with nine participants"],
    ], [3.2, 2.9, 10.9]),
    ...figure(F("iteration/F3A-route-search-iteration-strip.png"), 12.5, "Figure 5.2", "One Figma frame, the English route results screen, captured from the version history. v1 (28 Oct) shows an unlabelled red \"27 min\" and no wait for the next bus. v2 (30 Oct) labels the trip time, states the next bus twice with its Live source and lists the journey as legs. The final version (5 Nov) has a larger Live badge."),
    caption("Table 5.5", "Changes proposed for the next version, in response to the Maze results."),
    table(["Finding", "Proposed change", "Evidence"], [
      ["Home card not recognised as the way to save", "A visible \"Save stops\" button on the expanded card, and a stop page opened from the Home stop card (Section 6)", "Block 6: 2/9 expected path; 13 taps on the Home stop card; comments"],
      ["\"Full route\" read as the wait by two participants", "Relabel it \"Journey time\", matching the Chinese 全程需時", "Block 4"],
      ["Map view link easy to miss", "More visual weight for the Map buttons on Home and Nearby", "Block 14: one participant took eight steps; comment"],
      ["Saved stops expected on Home", "Show saved stops as well as saved routes in My favourites", "Block 7 comment"],
      ["Test did not include older passengers", "Re-test in Cantonese with participants aged 60+, on phones, with reworded questions", "Profile; blocks 4 and 10"],
    ], [4.4, 7.4, 5.2]),
  ];
}

function conclusion() {
  return [
    H1("6. Conclusion and Future Work"),
    H2("6.1 Summary"),
    P("We redesigned five features of App1933 for older passengers and daily commuters, and tied each decision to HCI theory and to studies of real-time transit information and ageing. The prototype answers \"when is my bus coming?\" on the first screen, labels every arrival Live or Scheduled, lets people search by place, puts a star on every stop, and offers text size, high contrast and calm mode in a grouped menu. Nine participants tested the English prototype in Maze. All finished the study, 78 of 81 mission attempts succeeded, and the information design worked: participants read arrival times, the buses serving a landmark and enlarged text correctly. The clearest weakness is the way into saving a stop from Home, which lacked a signifier. The two duration questions scored lower, but their wording, more than the screens, explains most of the wrong answers."),
    H2("6.2 Future direction: a stop page"),
    P("Our next step would be a stop page, reachable from the stop card on Home, from Nearby, from the map and from search, showing every route at that stop with its next arrivals and a labelled save button. The save results justify it. Only two of nine took the expected path; three participants tapped the Home stop card 13 times, looking for exactly this; and others looked for the stop in Nearby, on the map and in search, where stops appear but cannot be saved. A stop page would give all of those places the same destination and make saving possible wherever a stop is shown, while the route screen stays for people who start from a route. We would test it against the current design with the same task, comparing the expected-path rate and the taps on the stop card."),
    H2("6.3 Limitations"),
    ...bullets([
      "**Sample.** Nine participants aged 18 to 48, none aged 60 or over, tested in English, although one target group is older Cantonese speakers. Participants were peers and relatives, who may rate kindly.",
      "**Devices.** Five used a laptop, so most taps were mouse clicks and touch-target size and thumb reach were barely tested. Phone users took the expected path far less often.",
      "**Unmoderated sessions.** No one watched participants work, so hesitation shows only in the click data. The comments are the researcher's notes of informal conversations, not recordings.",
      "**Prototype fidelity.** The English page has plain links only, so taps on unlinked elements count as misclicks and caused one failure. Screens do not scroll, so content below the frame on 12 of the 31 screens cannot be reached. Text size, high contrast and calm mode are drawn on More and one Home screen, not applied everywhere, and two drawn screens (F3C, F1C) are not linked. The Chinese page's extra frames are wireframe-level, and its final save has layout faults (a squashed Home search bar, an invisible language label on S5–S7), which is why we present the English page.",
      "**Text size and wording.** The text-size steps are labelled 100%, 150% and 200%, but not every style scales by those factors (Section 3.7). Two comprehension questions pointed participants towards another value on the screen (blocks 4 and 10).",
      "**Screen readers.** We did not test the prototype with a screen reader, and our check of the original app inspected what it exposes to assistive technology rather than using VoiceOver.",
      "**No re-test.** The design was frozen before testing, so the changes in Table 5.5 are untested.",
    ]),
  ];
}

const REFS = [
  "Apple Inc. (n.d.). *Accessibility*. Human Interface Guidelines. Retrieved November 8, 2026, from https://developer.apple.com/design/human-interface-guidelines/accessibility",
  "Brakewood, C., & Watkins, K. (2019). A literature review of the passenger benefits of real-time transit information. *Transport Reviews, 39*(3), 327–356. https://doi.org/10.1080/01441647.2018.1472147",
  "Chandler, P., & Sweller, J. (1991). Cognitive load theory and the format of instruction. *Cognition and Instruction, 8*(4), 293–332. https://doi.org/10.1207/s1532690xci0804_2",
  "Chen, K., & Chan, A. H. S. (2014). Gerontechnology acceptance by elderly Hong Kong Chinese: A senior technology acceptance model (STAM). *Ergonomics, 57*(5), 635–652. https://doi.org/10.1080/00140139.2014.895855",
  "Czaja, S. J., Boot, W. R., Charness, N., & Rogers, W. A. (2019). *Designing for older adults: Principles and creative human factors approaches* (3rd ed.). CRC Press. https://doi.org/10.1201/b22189",
  "Edwards, S. M., Li, H., & Lee, J.-H. (2002). Forced exposure and psychological reactance: Antecedents and consequences of the perceived intrusiveness of pop-up ads. *Journal of Advertising, 31*(3), 83–95. https://doi.org/10.1080/00913367.2002.10673678",
  "Ferris, B., Watkins, K., & Borning, A. (2010). OneBusAway: Results from providing real-time arrival information for public transit. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (pp. 1807–1816). ACM. https://doi.org/10.1145/1753326.1753597",
  "Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (pp. 343–346). ACM. https://doi.org/10.1145/2470654.2470703",
  "Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392",
  "Gray, C. M., Kou, Y., Battles, B., Hoggatt, J., & Toombs, A. L. (2018). The dark (patterns) side of UX design. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (Paper 534, pp. 1–14). ACM. https://doi.org/10.1145/3173574.3174108",
  "Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600",
  "Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (pp. 152–158). ACM. https://doi.org/10.1145/191666.191729",
  "Norman, D. A. (2013). *The design of everyday things* (Rev. and expanded ed.). Basic Books.",
  "Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services* (pp. 203–210). ACM. https://doi.org/10.1145/1152215.1152260",
  "Shneiderman, B., Plaisant, C., Cohen, M., Jacobs, S., Elmqvist, N., & Diakopoulos, N. (2016). *Designing the user interface: Strategies for effective human-computer interaction* (6th ed.). Pearson.",
  "Watkins, K. E., Ferris, B., Borning, A., Rutherford, G. S., & Layton, D. (2011). Where is my bus? Impact of mobile real-time information on the perceived and actual wait time of transit riders. *Transportation Research Part A: Policy and Practice, 45*(8), 839–848. https://doi.org/10.1016/j.tra.2011.06.010",
  "World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (A. Campbell, C. Adams, R. B. Montgomery, M. Cooper, & A. Kirkpatrick, Eds.). W3C Recommendation. https://www.w3.org/TR/WCAG22/",
  "Zaphiris, P., Ghiawadwala, M., & Mughal, S. (2005). Age-centered research-based web design guidelines. In *CHI '05 Extended Abstracts on Human Factors in Computing Systems* (pp. 1897–1900). ACM. https://doi.org/10.1145/1056808.1057050",
];

function references() {
  return [
    H1("References", { pageBreak: true }),
    ...REFS.map((r) => new Paragraph({
      children: runs(r, { size: 19 }),
      indent: { left: 567, hanging: 567 },
      spacing: { after: 100, line: 252 },
    })),
  ];
}

module.exports = { testing, conclusion, references };

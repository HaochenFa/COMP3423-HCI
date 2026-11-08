# Final report and presentation plan

Working plan for the COMP3423 App1933 final submission, due **Sun 15 Nov 2026, 23:59**. Updated 8 Nov 2026.

Ground rules (agreed 8 Nov):
- **The Figma design is frozen.** We do not change screens in response to the test. Post-test ideas go into Discussion and Future Work.
- **Evidence is the Maze PDF and `user_feedback.docx` only.** `user-test-summary.docx` is a secondary write-up; its recommendations and interpretations are not participants' views and are not cited.
- **Report every result, but judge each one.** Where the data shows a real weakness we say so; where a complaint conflicts with established practice or comes from the test set-up, we explain why we keep the design.

Drafts so far: [report/03-overall-design.md](report/03-overall-design.md) and [report/04-feature-details.md](report/04-feature-details.md), both written from the current Figma file.

## 1. Test results (all figures checked against the Maze PDF)

Maze study "Kowloon_bus_app_Maze_user_testings", 9 participants, 21 blocks, run in English on the **en-GB** Figma page. Overall: Maze usability score **71/100** (the mean of the nine mission scores); overall rating **8 Good (89%), 1 Very Good (11%)**, none Moderate or worse.

| Maze block · mission | Feature | Direct / Indirect / Failed (researcher) | Success | Expected path | Score | Misclick | Avg. time | Comprehension check | Ease (Really easy / Easy / Moderate / A little difficult) |
|---|---|---|---|---|---|---|---|---|---|
| 1 · Let's get started! | O1–O2 onboarding | — | 100% | 100% | 91 | 73.5% | 33.1 s | — | — |
| 3 · Take a ride on Bus No.8 | F1 Home | 9 / 0 / 0 ("read bus information") | 100% | 100% | 84 | 25.0% | 16.5 s | Next Bus 8: 9/9 · Full route: **7/9** (2 answered "5 min") | 4 / 4 / 1 / 0 |
| 6 · Save Cross Harbour Tunnel Station | **F2** | **2 / 6 / 1** | 88.9% | **22.2%** | **43** | 54.5% | 38.3 s | — | 3 / 2 / 2 / **2** |
| 7 · Check your saved stations | F1/F2 | 7 / 1 / 1 | 88.9% | 77.8% | 83 | 61.7% | 6.3 s | — | — |
| 9 · Hung Hom → Argyle Centre | **F3** | 8 / 1 / 0 | 100% | 88.9% | 68 | 55.8% | 31.3 s | Walking time: **3/9** (6 answered the 28-min total) | 4 / 5 / 0 / 0 |
| 12 · Find bus stations nearby | **F4** | **4 / 5 / 0** | 100% | **44.4%** | **44** | 38.7% | 31.2 s | First bus: 8/9 | 3 / 4 / 2 / 0 |
| 14 · Use a map | F4 | 6 / 3 / 0 | 100% | 66.7% | 78 | 15.4% | 17.2 s | — | (Nearby rating above) |
| 15 · Find landmarks | F4 | 8 / 0 / 1 | 88.9% | 88.9% | 76 | 60.6% | 10.6 s | QEH buses: 9/9 | — |
| 18 · Adjust text size | **F5** | 6 / 3 / 0 | 100% | 66.7% | 71 | 37.3% | 31.6 s | Bus 116 at 200%: 9/9 | 5 / 2 / 2 / 0 |

Worst single screen: F4 Nearby Stops / List in block 12, 67% misclick, screen score 29 (Maze p.31). Page references for every figure: [user-test/maze-figures.md](user-test/maze-figures.md).

Things to know when writing:
- Maze recorded **no open-text answers**. All participant quotes come from the researcher's notes (`user_feedback.docx`), so the method must say sessions were observed and comments written down.
- The researcher's direct counts equal Maze's expected-path rates (2/9 = 22.2%, 4/9 = 44.4%, …): the two sources agree.
- The Maze PDF has **no test dates, devices, demographics or per-participant rows** (see §6).
- **The online Maze report has each participant's navigation path**, which the PDF lacks (link and full breakdown in [user-test/maze-figures.md](user-test/maze-figures.md) §8). Use it to say *where* people went, not only how many left the expected path. Its "Navigation overview" diagram for the save mission is a good figure for §5.
- **Each mission had one expected path, and Maze counts every other route as "indirect"**, even shorter ones. Three "indirect" successes took a shorter designed route than the expected path: route 101 from Home's Nearby section, and Home's Map view link (twice). Say this when reporting expected-path rates.
- **The tested en-GB page is less interactive than the zh-HK design.** It uses plain navigation links only: for example, the Nearby list had 4 linked elements (Map, Landmarks, routes 101 and 8), the welcome screen's language buttons were not linked, and map pins did not respond. Taps elsewhere count as misclicks or dead ends. The zh-HK page has 18,461 interactions and working state. Say this in the method and limitations.

## 2. Findings and our position

For the Discussion (§5.3). Each row reports the result in full, then gives our judgement.

| # | Finding (data, participants' words) | What the design does | Our position |
|---|---|---|---|
| 1 | **Reading arrival times works.** 9/9 direct; next Bus 8 9/9; 8/9 rated it Easy or Really Easy. | Saved routes first on Home; next arrival largest on the card; Live label. | **Confirms F1.** |
| 2 | **Route duration: 7/9.** Two answered "5 min" (the next-bus countdown) instead of the 27-min journey. | On the en-GB F1A card the tile reads "Full route / 27 min", directly under "Next bus 5 min". The zh-HK tile reads 全程需時 ("time for the whole route"). | **Partly agree.** The layout separates the two values, but the English label "Full route" does not say it is a time; the Chinese label does. A copy weakness in the tested English version, not a layout problem. |
| 3 | **Saving a stop is the weakest task.** 8/9 success but only 2/9 on the expected path; score 43; two rated it "A little difficult" (the only "difficult" ratings in the study). Paths (online report): 5 expanded the route 8 card on Home first, but only 2 went on from it to the route screen; 2 collapsed it and went back to Home, and two participants expanded it, went back and expanded it again. The other 4 left Home for Trip, Nearby, the map and Saved (one each). Of the 8 who reached the route screen, **4 came from the Home card and 4 by tapping route 8 in Saved**. The one failure searched Nearby and the map for 10 steps. Comments: "Not intuitive. Don't know that the station inside the column is interactive and can therefore lead to the saving process of target station." / "Thought the stations can be searched then saved." | On the expanded Home card (F1A), the stop list and tiles are one tappable area that opens the route screen, but nothing signals that; the only visible cue is a small "See full route and save stops" link. On the route screen (F2), saving is a labelled button plus a ☆ on every row, with Undo. Stops listed in Nearby have no save, and Home search goes to the trip planner, not to a stop page. | **Agree; this is our main design weakness.** The paths and the comment point to the same place: the way from the Home card into the route lacked a signifier (Norman, 2013). Only half of the successful participants found it, and the other half used Saved instead. Several also looked for the stop where stops appear (Nearby, the map, search), where it cannot be saved. Once on the route screen, saving worked. We report this openly and base the future direction on it (§3, Conclusion). |
| 4 | **Checking saved stops: 7/9 direct.** One failure: "The 'Saved' button was obstructed by the bottom of the instructions." One indirect: "Thought the saved stations can directly be checked in 'My Favorite' column in the home page." Paths: the indirect participant expanded route 8 on Home, went back and opened Saved; the failure went into route 8's detail and moved between the route, the alert sheet and Notices before dropping off. | Saved tab. Home's 我的收藏 shows saved *routes* only, with "See all 6" opening the Saved screen. | **The failure is a test artefact**, and the path fits it: the participant never reached the tab bar, which the Maze task panel covered. **The indirect case is a reasonable expectation**: someone who has just saved a stop may look for it on Home, which lists only routes. A minor point; Saved was one tap away. |
| 5 | **Route search works.** 9/9 success, 8/9 direct, all 9 rated it Easy or Really Easy. Comment: "Thought Search function should be bound with Map function." Path: that participant opened the map first, then the trip planner. | List-first results with time, fare and journey legs; map elsewhere. | **Disagree with the suggestion.** One participant's preference; they still finished in three screens. A list shows time, fare and transfers that a map hides, and a map-first planner adds load for older users. A map preview could be optional later. |
| 6 | **Walking time: 3/9.** Six chose "87D, 28 min" (the total) instead of "87D, 2 min". One participant asked for "a page with less distracting or redundant information". | Recommended card: 28 min total as the headline, a "Walk 2 min" chip, and the same walk repeated in the step-by-step list, which is open by default; five time values on one card. | **Partly agree.** Two causes, and we name both. (a) The question, "how long will you walk to get to the destination", can be read as total journey time, so it measures wording as well as design. (b) The total is the headline on purpose, as it is the number people decide on, but the card repeats information, which supports the participant's comment. Collapsing the steps by default would reduce noise. This is the lowest comprehension score and must be reported as such. |
| 7 | **Nearby: 9/9 success but 4/9 expected path;** list screen 67% misclick (5 of the 6 who saw it misclicked); first bus 8/9; 7/9 rated Nearby Easy or Really Easy. Paths: 6 opened the Nearby tab (4 went straight on, 2 switched to the map); 2 went Home → Map; 1 tapped route 101 in Home's Nearby section and arrived in one step. Comments: "Thought the details can be checked through the map." / "Didn't pay attention to the buttons at the bottom. Thought the stations can be checked through the map." | Two designed routes to nearby stops, the Nearby tab (list) and Home → 地圖檢視 → map with the same numbered stops and next buses, plus nearby routes on Home itself. | **Mostly disagree that this is a failure.** All five "indirect" participants used designed routes: four used the map, and one took a shortcut from Home that is shorter than the expected path. Maze counts any route other than the single expected one as indirect. The 67% misclick on the list is likely inflated by the test page, where only 4 elements on that screen were linked. A bottom tab bar is the platform standard. Minor point we accept: the "Map" button on the tested English Nearby screen is small. |
| 8 | **Map: 9/9, 6/9 direct.** "Forgot the small Map View button at the home page. Thought the map can be opened through an obvious button hidden inside the buttons underneath." Paths: 6 went Home → Nearby → Map; 2 used Home's "Map view" link and arrived in one step; 1 wandered through Trip, Nearby, More and Saved for 8 steps before finding Home's Map view. | Map via Home's "地圖檢視 / Map view" text link or Nearby's Map button; no map tab. | **Partly agree.** The Home link has low visual weight and one participant clearly struggled, but 8 of 9 reached the map in one or two taps, and two used that very link. We **disagree** that the map needs its own tab: the main task is reading arrival times, and a sixth tab works against Hick's law. |
| 9 | **Landmarks: 8/9; all 9 named both buses to Queen Elizabeth Hospital.** One failure: "Thought the landmarks should be found on Map, but failed to click anything because of no responses from the app (This is normal because it is just a prototype with certain testing routes)." Path: that participant tried the map twice and dropped off there. | Landmarks filter in Nearby lists category, walking time, nearest stop and buses. Map pins were not linked on the test page. | **Prototype limitation, not a design flaw**; the participant said so and the path confirms it. The other 8 went straight to the Landmarks filter (one tap), and the landmark list worked (9/9 comprehension). |
| 10 | **Text size: 9/9 success, 6/9 direct; 7/9 rated it Easy or Really Easy; after enlarging, 9/9 read Bus 116 correctly at 200%.** Paths: **7 of 9 tapped More as their very first move.** Of the 3 indirect, one opened More but left before finding the setting, one tapped Map view by accident first, and one checked Saved first. Comments: "Don't know they need to enter 'More' page to adjust text size." / "Thought the text size can be pinched open, but tapped Map View by accident and thus entered Map page." | Text size at the top of More (settings), 100/150/200%. | **Disagree.** Text size in the app's settings is standard practice on iOS, Android and virtually every app, and a real build would also follow the phone's system text size. The paths support this: More was the first place 7 of 9 looked. Pinch-to-zoom is a convention for maps, photos and web pages, not app interfaces. Once found, the accommodation worked for everyone. Also our accessibility-focused task (bonus 1%). |
| 11 | **Onboarding: 9/9, score 91,** but 56% misclick on the welcome screen. | Language segmented control plus Get started. | **Test artefact.** On the en-GB page only Get started was linked, so trying the language buttons registered as misclicks. They work on the zh-HK page. The CSV confirms it: all 50 misclicks were on the welcome screen, 34 of them on the language buttons, and one participant made 32 of the 50 ([participants.md](user-test/participants.md)). |
| 12 | **Satisfaction: all Good or Very Good; usability score 71.** | — | **Positive, read with caution.** Small sample, probably peers, so ratings may be kind; the Maze score penalises alternative paths and taps on unlinked areas, so it partly measures prototype fidelity. We weight task behaviour over ratings. |

**What this means for the Discussion, in five points:** (1) the information design works: once on the right screen, people read arrival times, landmark buses and enlarged text correctly; (2) the clearest weakness is the way into stop saving: only half of those who reached the route screen found it from the Home card, which we accept; (3) the route result's low comprehension has two causes, card redundancy and question wording, and we say both; (4) the navigation paths show that most "indirect" results used designed alternatives, some shorter than the expected path, and that the failures in blocks 7 and 15 fit the test artefacts the participants described; we explain these rather than concede them; (5) where feedback asks us to break platform conventions (text size outside settings, pinch-to-zoom, a map tab), we keep the design and give the reason, and for text size the paths back us (7/9 went to More first).

## 3. Report outline (max 20 pages excluding references and appendices)

Page budget: cover 1 + 18.5 body, leaving about half a page spare.

| § | Section | Pages | Owner (role) | Content | Figures / tables | Rubric items it must hit |
|---|---|---|---|---|---|---|
| — | Cover | 1 | Lead | Title, names + SIDs, workload table with leader marked; each "key tasks" cell points to sections/figures | Workload table | Each role visibly traceable. **Xulu Zhang's SID is missing in the checkpoint** |
| 1 | Introduction | 1 | Lead | App1933 context; two target groups; problem statement; why App1933; scope = F1–F5 and why feasible in 8 weeks | Small F1–F5 table | Problem + users (2), app choice (2), 5 features (2), realistic scope (2) |
| 2 | Related Work | 3 | All, edited by Lead | Synthesised by theme: (a) heuristics and cognition, (b) motor and touch, (c) older adults and accessibility, (d) real-time transit information, (e) intrusive ads and dark patterns. End each theme with "→ so we did X in F_n" | Optional principle → feature matrix | 10–20 refs all cited (3), balanced mix (3), synthesis (3), traceable to decisions (3) |
| 3 | Overall Design | 4 | Interaction + Visual + Researcher | **Drafted:** [report/03-overall-design.md](report/03-overall-design.md) | Journey map (exists), site map (to draw), walkthrough strips, rationale table, style guide, 100%/200% comparison | Overview (3), journey with pain points (4), walkthrough (4), named principles (4), coherence (3) |
| 4 | Feature Details | 5 | Each feature's designer + Accessibility lead for annotations | **Drafted:** [report/04-feature-details.md](report/04-feature-details.md) | 5 annotated "before" figures (callouts listed in the draft); 5 before/after figures from the Original vs Redesign page | Clickable via public link (4), annotated evidence (4), principles named (3), before/after for every feature (4), states and edge cases (5) |
| 5 | Testing, Results, Discussion | 4 | User Researcher | 5.1 method: participants, recruitment, Maze set-up (21 blocks), task ↔ feature table, metrics, procedure, note on en-GB prototype fidelity. 5.2 results: the §1 table, charts, verbatim quotes. 5.3 discussion: §2. 5.4 iteration: see note below | Task table; stacked bar of direct/indirect/failed; comprehension bar chart; Maze p.14 funnel; satisfaction chart | Real test + raw data in appendix (5), method (4), data + quotes (4), discussion linked to decisions (4), iteration (3) |
| 6 | Conclusion & Future Work | 1 | Lead | Summary consistent with §5; one future direction; limitations | — | Consistent summary (3), one justified direction (3), honest limitations (2) |
| — | References | — | Lead | 12–16 refs, APA 7 | — | Markers spot-check 2–3 |
| — | Appendices | — | Researcher + Accessibility | A. Maze report pages + per-participant export; B. task script (verbatim in maze-figures.md §3); C. Figma and Maze links; D. accessibility audit of the original app ([draft](report/appendix-d-accessibility-audit.md)); E. extra screens | — | Raw data, task script, Figma URL; accessibility audit (bonus 2%) |

**Iteration evidence (5.4), with the design frozen.** The rubric item reads "prototype visibly changed in response to test findings (3)". The dated timeline from Figma version history is in [report/05-4-design-iteration.md](report/05-4-design-iteration.md). In short:
- 28 Oct: 13 screens (v1).
- 28 Oct: 28 screens in two languages, prototype links and the comparison boards.
- 29–30 Oct: split into zh-HK and en-GB pages, the 150% / 200% / high-contrast states, resize to 402 × 874 and the official icon.
- 2 Nov: variable collections for text size, contrast, language and state, plus 111 dialog and flow frames.
- 3 Nov: 200% acceptance-check frames.
- 5 Nov: arrival rows re-laid out on 15 + 14 screens. This was the last save before the test.

Present the §2 accepted points as proposed changes in Future Work. Markers may still score this item 0, because no change responded to the Maze test. The pre-test iteration ran in three owned passes:
- Haochen Fa improved and extended Li-En Lo's v1 (28–30 Oct).
- Xulu Zhang built the interactive prototype (2 Nov).
- Moling Kong reviewed accessibility (3–5 Nov).

The accessibility pass (a 200% check, then arrival-row changes) is the closest thing to iteration after findings, from our own expert review rather than user testing.

**Limitations to state (6).** n = 9; tested in English only, while one target group is older Cantonese speakers; no participant was aged 60+ (ages 18–48, seven of nine aged 18–20), although the checkpoint planned at least one, so the elderly group is not represented; five of nine used a laptop, so most taps were mouse clicks and touch-target size and thumb reach were not really tested; the en-GB test page had fewer working interactions than the full design, which inflates misclicks and caused one failure; Maze's task panel blocked a target once; one comprehension question was ambiguously worded; no screen-reader testing; no re-test. Design issues found in our own audit of the frozen file (decided 8 Nov to report as limitations, not fix):
- at 200% text, two secondary descriptions on the More screen (S2, S2B) wrap into the row below;
- on S5, S6 and S7 (zh-HK) the 繁 language label is white on a white pill;
- the "目前位置" label on F4B is `#BBBBBB` on white (1.92:1, below WCAG 1.4.3);
- the Home search bar (F1) is 24 pt tall in the final file: it meets WCAG 2.5.8's 24 pt minimum but not the 44 pt the rest of the design follows. It was taller on 30 Oct and had shrunk by 3 Nov (visible in the Home iteration strip);
- the 111 frames added on 2 Nov so every tap responds (sections 互動補全, 07, 08) are wireframe-level: plain outlined buttons and list rows, no cards or ETA styling, dialogs without the app header, and some prototype-control copy such as 測試：找不到的地點 and 模擬前進一站. The core 31 screens carry the visual design.

**Future direction (pick one).** Recommended: **a stop page reachable from search, the map and Home cards, with a save button on it**, justified by the save results (22.2% expected path, both comments, only half of those who reached the route screen finding it from the Home card) and by the participants who looked for the stop in Nearby, the map or search. Alternative: a moderated study in Cantonese with participants aged 60+, though that is an evaluation step rather than a development direction.

## 4. Presentation (PPT + video ≤ 10 min)

Screenshot-driven, one idea per slide, about 15 slides. Each member presents their own part so roles are visible.

| Time | Slides | Content | Presenter |
|---|---|---|---|
| 0:00–1:30 | 1–3 | Title + team/roles; App1933 and the two target users; 3 real pain-point screenshots (launch advert, route-number-only search, hidden save menu) | Lead |
| 1:30–2:30 | 4 | Dual-track journey map, highlighting the −3 dips at launch and search, arrows to F1–F5 | User Researcher |
| 2:30–6:30 | 5–10 | IA and visual language (1 slide); F1–F5 before/after (1 slide each, principle named on the slide); **live Figma Present-mode walkthrough** of the zh-HK prototype: first launch → Home → save with Undo → plan a trip with typo correction → nearby landmarks → text size 200% and high contrast (≈2 min of the 4) | Interaction Designer + Visual Designer + Accessibility Lead (F5) |
| 6:30–9:00 | 11–14 | Method (n = 9, tasks ↔ features); results chart + satisfaction; what worked; what we accept (stop-saving entry) and what we defend (text size in settings, map as an alternative path), one verbatim quote each | User Researcher |
| 9:00–10:00 | 15 | Summary, one future direction, limitations | Lead |

Production notes: demo the zh-HK prototype (more complete than the tested en-GB page) in Present mode with the iPhone 18 Pro device frame; record segments separately and cut together; aim for 9:30. PPT design by the Visual & UI Designer using the app's visual language (Noto Sans HK, #C8102E, white).

## 5. Schedule (7 days)

| Day | Work |
|---|---|
| Sun 8 Nov | Agree this plan; assign owners; request missing data (§6) |
| Mon 9 – Tue 10 | Annotate original screenshots; export figures from Figma; export Maze raw data; draw the site map; each member brings 3–4 references; Researcher drafts §5 from §1–2 |
| Wed 11 | First full draft of every section |
| Thu 12 | Lead integrates and checks page count; PPT draft; charts final |
| Fri 13 | Record video segments; check the Figma link from a logged-out browser |
| Sat 14 | Edit video; proofread; check every number against the Maze PDF |
| Sun 15 | Buffer; submit zip (report + PPT) on Canvas and upload video by early evening |

## 6. Gaps to close (missing evidence = 0 marks)

1. **Participant profile: partly done (8 Nov).** Chenyang's sheet is [user-test/user_basic_information.docx](user-test/user_basic_information.docx): Maze ID, age, device and test date for all 9 participants.

   | | |
   |---|---|
   | Ages | 18–48 (median 19, mean 25.1). Seven aged 18–20, two aged 45 and 48. **No one aged 60+.** |
   | Devices | Laptop 5, mobile phone 3, tablet 1 |
   | Test dates | 5 Nov ×4, 6 Nov ×2, 7 Nov ×3 (2026) |

   Still to ask Chenyang:
   - background or occupation (don't assume the 18–20s are students);
   - how participants were recruited;
   - remote or in person, moderated or not;
   - whether the Maze IDs can be matched to the rows in `user_feedback.docx`, so comments can be linked to age and device;
   - what time the 5 Nov sessions ran, and when the prototype was imported into Maze. The design was last saved on 5 Nov at 17:56, so the report needs to know whether any 5 Nov session saw an earlier version.
2. **Per-participant raw export from Maze: block 1 only so far (8 Nov).** Markers check for "timestamps, per-participant, per-task metrics".
   - [user-test/kowloonbusredesign_block-results_mission.csv](user-test/kowloonbusredesign_block-results_mission.csv) has, for each participant: start and end times, device, OS, browser, language, path, time on each screen, and every click with its coordinates.
   - It covers only block 1 ("Let's get started!"). Its totals match the PDF exactly (mean 33.1 s, 73.5% misclicks).
   - [user-test/participants.md](user-test/participants.md) joins it with the participant sheet: P1–P9 profile, session times and block 1 per participant. Use it for Appendix A.
   - **Still needed:** the same export for the other mission blocks (3, 6, 7, 9, 12, 14, 15, 18). *Ask Chenyang.*
   - Also ask him to confirm the CSV's timezone. If it is UTC, all sessions began after the last design save.
3. **Task script:** done; verbatim wording of all 21 blocks is in [user-test/maze-figures.md](user-test/maze-figures.md) §3.
4. **Accessibility audit of the original app** (bonus 2%: "documented accessibility audit of the existing app (e.g. WCAG basics: contrast, touch target size, text scaling, screen-reader compatibility)"). Owner: Moling. **Mostly done (8 Nov):** [report/appendix-d-accessibility-audit.md](report/appendix-d-accessibility-audit.md) has the method, a 10-row results table, Figure D.1 ([report/figures/audit/appendix-d-contrast-targets.png](report/figures/audit/appendix-d-contrast-targets.png)), a per-screen table of what the app exposes to screen readers, about 60 words for §2 or §4, and how the redesign answers each finding. Results:
   - Contrast: main text passes. Search placeholder 1.38:1, Nearby mode buttons 1.92:1 and the slate bars 4.37:1 fail. All three are confirmed on an iPhone (v2.3.39, 8 Nov), which also shows the Nearby empty-state message at 1.66:1.
   - Targets: stop icons 26 pt (meet 24 pt, under 44 pt); the planner star fails WCAG 2.5.8.
   - Text: no text-size setting in the app; it ignores iOS Larger Text; text already cut off at the default size.
   - Screen reader: tabs, the More menu and the language options are labelled. Route rows, stop lists, keypads and all icon-only buttons are not exposed (provisional).

   **Larger Text test: done on an iPhone (8 Nov).** The app ignores the system text size: Home text is identical to the pixel at the maximum setting (Figure D.2, [report/figures/audit/appendix-d-text-scaling.png](report/figures/audit/appendix-d-text-scaling.png)). The 04 draft now says so.

   **Still to do (about 10 minutes, steps in the appendix):** a VoiceOver walk-through to confirm the screen-reader row.
5. **Annotated original screenshots:** done (8 Nov). Five figures are in [report/figures/annotated/](report/figures/annotated/), `F1-home-annotated.png` … `F5-more-annotated.png`:
   - Format: 2480 px wide at 400 dpi (15.7 cm in Word). Numbered red callouts with an English legend.
   - Screenshot pixels unchanged: only the Mac window frame was cropped off.
   - Every callout was checked against the screenshot, and the 04 draft's figure captions now match.
   - Draft claims the screenshots did not support were softened: "a daytime search", "changes the boarding and alighting stops", "no text-size option anywhere". Restore any of them only with a capture that shows it.
   - "Advert on launch" is back in the drafts, now backed by a phone capture taken right after opening the app: `t1-launch-fullscreen-ad.png`, added 8 Nov as the left panel of F1.
   - F5 now uses the iPhone capture of the More menu (v2.3.39). It shows 26 icons; the Mac capture had cut off the last row, so the drafts now say 26.
   - Six iPhone captures of v2.3.39 (8 Nov, `*-iphone-*.png`) add two points to the drafts: a banner advert on every main tab, and an empty 收藏 with no hint of how to save.
   - Their Home and Nearby show "no stops nearby" and carry Japanese-language ads, which suggests the phone was outside Hong Kong. Use them for these points only, not as a typical Home.
   - Five iPhone captures of the v2.3.39 planner (`t4-planner-iphone-*.png`) make a new figure, 4.3b ([report/figures/annotated/F3b-pick-location-annotated.png](report/figures/annotated/F3b-pick-location-annotated.png)): the origin still shows "null", and picking a place takes region → district → area → map + 確認.
   - The fifth capture (`t4-planner-iphone-smart-suggestion-result.png`) is not used as evidence that the AI changes the stop. Its origin was a place (港鐵紅磡站), so boarding at a stop 448 m away is a normal result.
   - `make_figs.py` re-renders the figures.
6. **Xulu Zhang's SID** for the cover page. *Haochen will fill it in.*
7. **References:** done. [report/references.md](report/references.md) has:
   - 18 references checked against DOI records and publisher pages (6 theory, 5 domain, 7 modality, older adults and accessibility);
   - six Related Work themes, each ending "→ so in F_n we …";
   - verified reserves, which can bring the total to 20 if §5.1 discusses sample size.

   The drafts' unverified citations (Czaja et al. on 44 pt; Kurniawan & Zaphiris) were replaced on 8 Nov. No peer-reviewed study of a Hong Kong bus app was found; Chen & Chan (2014) on older Hong Kong adults is the local source.
8. **Site map diagram:** done: [report/figures/site-map.png](report/figures/site-map.png), built from the zh-HK prototype links.
9. **Iteration evidence:** the timeline is done ([report/05-4-design-iteration.md](report/05-4-design-iteration.md)), and the three-date Home strip is at [report/figures/iteration/F1-home-iteration-strip.png](report/figures/iteration/F1-home-iteration-strip.png). Still open:
   - Before the report gives a specific reason for the 5 Nov arrival-row changes, confirm it with Moling.
   - Ask whether any change was made after a pilot or informal feedback (that would count).

**Design QA notes:** the five issues found on 8 Nov are reported as limitations (see "Limitations to state" in §3). One knock-on: the caption on Original vs Redesign board 08 says the 200% layout is "still clear", so the report must not repeat that claim.

## 7. Candidate references (superseded)

The verified list is [report/references.md](report/references.md). The candidates below are kept for the record; some details below were corrected there, e.g. WCAG 2.2 is cited as W3C (2024).

HCI theory
- Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. *Proc. CHI '94*, 152–158. (source of the ten heuristics, H1–H10)
- Nielsen, J., & Molich, R. (1990). Heuristic evaluation of user interfaces. *Proc. CHI '90*, 249–256.
- Norman, D. A. (2013). *The Design of Everyday Things* (rev. ed.). Basic Books. (signifiers: the stop-saving finding)
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391.
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26.
- Shneiderman, B., Plaisant, C., et al. (2016). *Designing the User Interface* (6th ed.). Pearson.
- W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*.

Domain: transit and real-time information
- Ferris, B., Watkins, K., & Borning, A. (2010). OneBusAway: Results from providing real-time arrival information for public transit. *Proc. CHI '10*.
- Watkins, K. E., Ferris, B., Borning, A., Rutherford, G. S., & Layton, D. (2011). Where is my bus? Impact of mobile real-time information on the perceived and actual wait time of transit riders. *Transportation Research Part A, 45*(8), 839–848.
- Edwards, S. M., Li, H., & Lee, J.-H. (2002). Forced exposure and psychological reactance: Antecedents and consequences of the perceived intrusiveness of pop-up ads. *Journal of Advertising, 31*(3), 83–95.
- Gray, C. M., Kou, Y., Battles, B., Hoggatt, J., & Toombs, A. L. (2018). The dark (patterns) side of UX design. *Proc. CHI '18*.

Users: older adults
- Czaja, S. J., Boot, W. R., Charness, N., & Rogers, W. A. (2019). *Designing for Older Adults* (3rd ed.). CRC Press.
- Kurniawan, S., & Zaphiris, P. (2005). Research-derived web design guidelines for older people. *Proc. ASSETS '05*.

Modality: mobile touch
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. *Proc. MobileHCI '06*.
- Apple. *Human Interface Guidelines* (44 × 44 pt minimum hit target).

Evaluation method
- Nielsen, J., & Landauer, T. K. (1993). A mathematical model of the finding of usability problems. *Proc. INTERCHI '93*.
- Sauro, J., & Lewis, J. R. (2016). *Quantifying the User Experience* (2nd ed.). Morgan Kaufmann.

## 8. Source of truth for numbers

Every figure in the report and slides should be traceable to a page of `user-test/maze_official_report.pdf` (image-only) or to the researcher coding in `user-test/user_feedback.docx`. [user-test/maze-figures.md](user-test/maze-figures.md) transcribes the whole Maze PDF with a page number beside every figure and marks its own calculations as **[derived]**; cite those as our calculations. Useful figure pages: p.1 (score 71), p.14 (save funnel, 22.2%), p.16 (F1A card), p.29 and p.31 (Nearby funnel and 67% misclick screen), p.50 (satisfaction). For participants' actual routes, screenshot the "Navigation overview" on the online report's mission pages (link in maze-figures.md §8), especially block 6 (save) and block 18 (text size). Screen images on p.24–47 are blank in the export, so use Figma exports for those screens.

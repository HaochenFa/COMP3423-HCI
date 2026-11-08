# 3. Overall Design

> Draft, 8 Nov 2026. Written from the frozen Figma file (zh-HK page as the primary design; the en-GB page is the subset used in the Maze test). Target length 3–5 pages including figures; this full draft is about 2,500 words and needs cutting to roughly 1,500 once the content is agreed. Citations refer to the candidate reference list in `final-deliverables-plan.md` §6 and must be checked before submission. Figure notes in grey boxes say where each image comes from.

## 3.1 Application overview and purpose

App1933 is the official app of Kowloon Motor Bus and Long Win Bus. People open it mainly to answer one question, "when is my bus coming?", and less often to look up a route, plan a trip to a place, or find a stop nearby. Our redesign keeps that scope and reorganises the app around four goals:

1. **Answer the main question on the first screen.** Saved routes and their next arrivals are the first thing users see, with no launch advert in the way.
2. **Let people search the way they think.** Place and landmark names instead of route numbers and stop codes.
3. **Remove what competes with the task.** No pop-up adverts, mini-games or mascot graphics; one labelled ad space that can be closed.
4. **Work for older passengers as well as hurried commuters.** Larger targets, text scaling up to 200%, high contrast, a calm mode and three interface languages.

The prototype targets an iPhone (402 × 874 pt frames, presented in Figma's iPhone 18 Pro device frame). It is built in Figma with two pages of app screens. The **zh-HK page** is the full design: 31 core screens plus 14 full route-detail screens (seven routes, both directions, with stop sequences taken from KMB's open data) and the dialog and flow screens that make secondary actions work, 142 frames and 18,461 prototype interactions in total. It uses Figma variables to hold state, so a saved stop stays saved, a chosen alert setting is remembered, and the language (繁體中文, 简体中文, English), text size (100%, 150%, 200%) and contrast (standard, high) switch across every screen. The **en-GB page** repeats the 31 core screens in English, plus a 200% text version of Home, and was the version tested in Maze (Section 5). Arrival times, timetables and fares in the prototype are simulated, and the screens say so where it matters.

## 3.2 Target users and their journey

We design for two groups identified in our checkpoint research:

- **Older passengers** often do not know route numbers or stop codes, find small text hard to read, and may take pop-up adverts for scams. They need search by place name, large readable text and an interface that does not surprise them.
- **Students and daily commuters** are confident smartphone users who are short of time, often using the app one-handed while walking. They need their usual routes and arrival times immediately.

Figure 3.1 shows the dual-track journey map. In both tracks the lowest emotional points (−3) come at **launch** (a full-screen advert with a small skip button) and at **search** (route-number-only search, numeric stop codes, an AI assistant that changes the destination). Reading arrival times is the third pain point: small text, banner adverts over the information, and no way to tell a live estimate from a scheduled time. Table 3.1 shows how each stage maps to a feature.

| Journey stage | Main pain point (existing app) | Addressed by |
|---|---|---|
| Opening the app | Full-screen advert on launch; saved routes buried | F1 Home |
| Searching | Search only accepts route numbers; origin can be "null"; AI changes the destination; nearby search wants a stop code | F3 Trip planning, F4 Nearby |
| Reading and waiting | Small text; adverts over arrival times; live and scheduled times look the same | F1 Home, F2 Route detail, F5 Accessibility |
| Saving for next time | Saving a stop takes seven taps behind an unlabelled ≡ icon | F2 One-tap save |

*Table 3.1. Journey stages, pain points and the features that address them.*

> **Figure 3.1** Dual-track user journey map (elderly passenger / student-commuter), with emotion curve and pain points. Source: `App1933_Dual_Track_User_Journey_Map_EN_Formatted(1).pdf` (User Researcher).

## 3.3 Information architecture

The existing app spreads its functions across a bottom bar of six items (Home, Favourites, Search, Nearby, **Games**, and a grid button that opens about 30 unsorted icons). We reduced this to five labelled tabs, each mapped to one user goal (Figure 3.2):

| Tab | 主頁 Home | 行程 Trip | 附近 Nearby | 收藏 Saved | 更多 More |
|---|---|---|---|---|---|
| Goal | When is my usual bus coming? | How do I get to a place? | What can I catch from here? | My routes and stops | Settings and accessibility |
| Main screens | F1, F1A, S5–S7 | F3, F3A, F3C, S1 | F4, F4A–F4C, S4 | F1B, F1C, management flow | F5, M1, S2–S3 |

Route detail (F2 family: stop list, timetable, notices, alight alert) is reached from any route badge in Home, Trip, Nearby or Saved, so a route always opens the same screen wherever it is tapped. Every core screen keeps the tab bar, so users can always get back to a known place in one tap.

Screens follow a naming scheme that also structures the Figma file: **O** onboarding, **F** feature screens, **S** states and edge cases, **M** modals and sheets. The six sections of the file (01 Onboarding & location, 02 Home & Saved, 03 Route detail & tools, 04 Trip planner & route search, 05 Nearby stops & landmarks, 06 More & accessibility) follow the same order as the tabs.

> **Figure 3.2** Site map: five tabs and the screens under each, with route detail as a shared destination. *To be drawn (not yet in the repo); build from the table above.*

## 3.4 Walkthrough

Two scenarios show the design end to end (Figure 3.3). Each step names the screen so markers can follow it in the public prototype.

**Scenario A: a commuter checks the bus and saves a stop.**

1. *First launch (O1).* The welcome screen states three promises (your routes first, search by place name, no pop-up ads) and lets the user choose 繁體中文, 简体中文 or English before anything else.
2. *Location (O2).* The app explains why it wants location and offers **使用 App 時允許** (Allow while using the app) or **暫時不用** (Not now), noting that this can be changed later in More.
3. *Home (F1).* The first card is route 8 to Kowloon Station: **5 分鐘 實時** (5 min, Live). A status line shows the area (紅磡站附近), the last update (更新於 10:32) and that times refresh automatically.
4. *Expand (F1A).* Tapping route 8 expands the card in place to show journey time (27 min), fare ($5.8), number of stops and the stop list, with a link to the full route.
5. *Route detail (F2).* The full route lists every stop with a ☆ on each row. The current stop is expanded with its next two arrivals (5 min Live, 30 min Scheduled) and three tools: alight alert, timetable and routes via this stop.
6. *Save (F2A).* Tapping **收藏此站** (Save this stop) turns the star red, changes the button to **已收藏此站** (Stop saved) and shows a toast with **復原** (Undo). No dialog interrupts the user.
7. *Alight alert (M2 → F2D).* The user picks the stop to get off at and when to be alerted (one, two or three stops before; vibrate, sound, lock screen). The in-progress screen counts down the stops left and marks the stop where the alert will fire.

**Scenario B: an older passenger plans a trip without location and enlarges the text.**

1. *Location off (S4).* Choosing Not now leads to Nearby, which explains that location is off and offers two equal ways forward: turn it on, or **以地點名稱搜尋** (search by place name), with popular places listed underneath.
2. *Trip planner (F3).* The origin is already filled with the current location, so the user only types a destination. Suggestions show the place type and street (旺角中心 · 彌敦道 688 號 · 商場), so similar names can be told apart.
3. *Results (F3A).* Three options are listed. The first is labelled **推薦** (Recommended) and **最快 · 直達** (Fastest · Direct), with total time, arrival time, fare and the legs of the journey (walk 2 min → 87D, 6 stops).
4. *Typo (F3C).* If the user types 朗豪方 instead of 朗豪坊, the app says what it changed and offers **改回原本輸入** (Use my spelling) or **正確** (Correct).
5. *Text size (F5 → S2B).* In More, the text-size control steps from 100% to 150% to 200%, and the whole app scales. High contrast can be turned on alongside it (S2).

> **Figure 3.3** Walkthrough strips. A: O1 → O2 → F1 → F1A → F2 → F2A → M2 → F2D. B: S4 → F3 → F3A → F3C → F5 → S2B. Source: Figma zh-HK page (node IDs: O1 26:1111, O2 45:2436, F1 45:2438, F1A 45:2439, F2 45:2440, F2A 45:2441, M2 30:1982, F2D 30:2202, S4 45:2437, F3 45:2445, F3A 45:2446, F3C 45:2447, F5 45:2451, S2B 358:2534). Export at 2× and add step numbers.

## 3.5 Design rationale

Table 3.2 lists the decisions that apply across the whole app and the principle behind each. Feature-specific decisions are in Section 4.

| Decision | Where | Principle |
|---|---|---|
| Saved routes and next arrivals are the first content on Home; no launch advert | F1 | Flexibility and efficiency of use (Nielsen, 1994, H7); intrusive ads raise irritation and avoidance (Edwards et al., 2002) |
| Every arrival carries a text label, **實時** Live or **預定** Scheduled, as well as a colour | F1, F2, F4, F3A | Visibility of system status (H1); colour is never the only cue (WCAG 1.4.1) |
| A status line shows the last update; offline and disruption states say what is wrong and what to do | F1, S5, S6, S7 | Visibility of system status (H1); real-time information builds trust only when its reliability is clear (Ferris et al., 2010; Watkins et al., 2011) |
| Five labelled tabs instead of six items plus a grid of about 30 icons; settings grouped into three headed sections | Tab bar, F5 | Hick's law (Hick, 1952); recognition rather than recall (H6) |
| Primary actions are large, full-width buttons; ☆ and row targets are at least 44 pt; navigation sits in the bottom tab bar within thumb reach | All | Fitts' law (Fitts, 1954); one-handed thumb use (Parhi et al., 2006); Apple's 44 pt minimum |
| Search by place name, with the origin preset to the current location | F3, S4 | Match between system and the real world (H2); recognition rather than recall (H6); error prevention (H5) |
| Undo instead of confirmation dialogs for save and remove; confirmation only for "remove all" | F2A, Saved | User control and freedom (H3); permit easy reversal of actions (Shneiderman et al., 2016) |
| Errors are shown at the field that caused them, with a way to recover | S1, F3C | Help users recognise, diagnose and recover from errors (H9) |
| One labelled, closable ad space; no pop-ups, games or mascots | F1, F5 | Aesthetic and minimalist design (H8); avoiding dark patterns such as nagging (Gray et al., 2018) |
| The same components (route badge, arrival block, tab bar) behave the same on every screen | All | Consistency and standards (H4) |
| Related information is grouped in cards with clear headings | All | Gestalt proximity and common region |

*Table 3.2. Cross-cutting design decisions and the principles behind them (H1–H10 = Nielsen's heuristics).*

## 3.6 Visual language and consistency

The visual language keeps KMB's brand colour but uses it sparingly, so that it signals where to act.

- **Colour.** Brand red `#C8102E` is reserved for the header, route badges, primary buttons and the active tab. Content sits on white cards over a neutral grey (`#F5F5F5`) background. Arrival numbers are set in near-black ink, not red, so they read as information, not warnings. Status uses a small semantic set: green for Live (`#087A45` on `#E6F6EE`), amber for Scheduled and diversions (`#9A4C00` on `#FFF1DF`), and a red-outlined badge for suspended services.
- **Type.** Noto Sans HK throughout, which covers Traditional and Simplified Chinese and Latin text in one family, with Black weight for screen titles and Bold 20 for section titles. Arrival times use the largest type on each card, as they are the information people come for.
- **Components.** A Tab Bar component (five tabs × two languages = 10 variants), a Status Bar and the official App1933 logo are shared by both locales, so the two language versions cannot drift apart. Every core screen has the same anatomy: status bar, title bar or red header, content, tab bar.
- **Restraint.** We removed decorative elements that competed with the task: no mascots on the route map, no tinted icon badges, no "tap to view" filler text.

> **Figure 3.4** Style guide panel: colour swatches with hex values, type scale, route badge, arrival block (Live / Scheduled), tab bar. *To be composed by the Visual & UI Designer from the Components page and F1.*

## 3.7 Accessibility considerations

Accessibility was designed in rather than added at the end, mainly for older passengers but also for anyone reading a phone on a moving bus.

- **Text scaling up to 200%.** Font size and line height are bound to a variable collection with 100%, 150% and 200% modes: 1,947 of the 2,131 text layers (91%) on the core screens use it. Changing the setting in More therefore rescales the whole zh-HK prototype, and cards grow and reflow rather than truncate (Figure 3.5). This addresses WCAG 1.4.4 Resize Text. *Known issue: at 200%, two secondary descriptions on the More screen wrap into the row below (S2, S2B); see Section 6.*
- **High contrast.** A second variable collection (standard / high contrast) controls text and border colours on all 31 core screens; turning it on darkens secondary text and strengthens borders everywhere at once.
- **Calm mode.** Removes the ad card from Home (its visibility is tied to the calm-mode setting) and, in a built app, would also reduce animation and non-essential extras, in the spirit of WCAG 2.2.2 Pause, Stop, Hide and 2.3.3 Animation from Interactions.
- **Contrast (measured).** We computed WCAG contrast ratios for every text layer on the 31 core zh-HK screens against its background. Body text and labels meet the 4.5:1 AA threshold: white on brand red and red on white are 5.88:1, secondary grey `#696969` on white 5.49:1, the Live badge 4.84:1 and the Scheduled badge 5.55:1. The exceptions are a dimmed "past departures" figure in the timetable (4.17:1), a decorative street label on the illustrative map (3.99:1) and one placeholder label on the Landmarks screen (1.92:1).
- **Target size (measured).** Of 657 tappable elements on the core screens (excluding the tab bar, whose items are about 77 × 59 pt), none is smaller than 24 pt, so all meet WCAG 2.5.8 Target Size (Minimum), and 594 (90%) are at least 44 pt in both directions, the size recommended for older users (Czaja et al., 2019). The smaller ones are route badges (about 31–38 pt tall) and toggles (50 × 30 pt).
- **Not colour alone.** Live, Scheduled, Offline, Diverted and Suspended are always written out, often with an icon.
- **Less memory load.** Place-name search, the preset origin, suggestions with categories and saved routes on Home reduce what users must remember, which matters for older adults (Czaja et al., 2019; Kurniawan & Zaphiris, 2005).
- **Choice of language and of location.** Three interface languages, each listed in its own script, and every location-dependent screen has a non-location alternative (S4).

What we could not do: Figma cannot test screen-reader behaviour, so VoiceOver labels and reading order are specified only at the design level and remain untested (Section 6).

> **Figure 3.5** The same Home screen at 100% and 200% text, and More with high contrast on. Source: zh-HK F1 (45:2438) and the 200% check frame on the zh-HK page ("驗收 · 首頁 200%"), or en-GB F1 at 200% (582:3847); S2 (45:2453).

*Method note for the contrast and target-size figures: computed on 8 Nov 2026 by script from the Figma file, using the WCAG relative-luminance formula on each text layer's fill and the nearest filled container behind it, and the bounding box of every element with a prototype interaction. Backgrounds made of overlapping layers are not detected, so the figures are close estimates, not a formal audit.*

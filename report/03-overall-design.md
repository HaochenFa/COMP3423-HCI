# 3. Overall Design

> Draft, 8 Nov 2026. Written from the frozen Figma file, **en-GB page**.
>
> - The en-GB page is the version tested in Maze, and every figure uses it.
> - The Traditional Chinese page has layout faults in its final save: the Home search bar is squashed to 24 pt, and the language button is blank on S5–S7. So it is not used for figures (team decision, 8 Nov).
> - Length: target 3–5 pages including figures. This draft is about 2,500 words and needs cutting to roughly 1,500 once the content is agreed.
> - Citations follow [references.md](references.md).
> - Figure notes in grey boxes say where each image comes from.

## 3.1 Application overview and purpose

App1933 is the official app of Kowloon Motor Bus and Long Win Bus. People open it mainly to answer one question, "when is my bus coming?". Less often they use it to look up a route, plan a trip to a place, or find a stop nearby. Our redesign keeps that scope and reorganises the app around four goals:

1. **Answer the main question on the first screen.** Saved routes and their next arrivals are the first thing users see, with no launch advert in the way.
2. **Let people search the way they think.** Place and landmark names instead of route numbers and stop codes.
3. **Remove what competes with the task.** No pop-up adverts, mini-games or mascot graphics; one labelled ad space that can be closed.
4. **Work for older passengers as well as hurried commuters.** Larger targets, a text-size setting, high contrast, a calm mode and three interface languages.

The prototype targets an iPhone: 402 × 874 pt frames, presented in Figma's iPhone 18 Pro device frame. We present the **English (en-GB) page**, which is the version we tested in Maze (Section 5).
- It has 31 core screens, plus a version of Home at the largest text size.
- The screens are joined by prototype links: 98 linked elements plus the tab bar on every screen.

The file also has a Traditional Chinese page with the same core screens. There, the prototype was extended with Figma variables so that state carries across screens: a saved stop stays saved, and language, text size and contrast switch everywhere. It also adds full route details for seven routes and the dialogs that make secondary actions respond (142 frames; Section 5.4). Arrival times, timetables and fares in the prototype are simulated, and the screens say so where it matters.

## 3.2 Target users and their journey

We design for two groups identified in our checkpoint research:

- **Older passengers** often do not know route numbers or stop codes, find small text hard to read, and may take pop-up adverts for scams. They need search by place name, large readable text and an interface that does not surprise them.
- **Students and daily commuters** are confident smartphone users who are short of time, often using the app one-handed while walking. They need their usual routes and arrival times immediately.

Figure 3.1 shows the dual-track journey map. In both tracks the lowest emotional points (−3) come at two stages:
- **launch:** a full-screen advert with a small skip button;
- **search:** route-number-only search, numeric stop codes, and an AI assistant that changes the destination.

Reading arrival times is the third pain point: small text, banner adverts over the information, and no way to tell a live estimate from a scheduled time. Table 3.1 shows how each stage maps to a feature.

| Journey stage | Main pain point (existing app) | Addressed by |
|---|---|---|
| Opening the app | Full-screen advert on launch with only a small skip button; saved routes buried | F1 Home |
| Searching | Search only accepts route numbers; origin can show "null"; picking a place takes region → district → area → map; the AI suggestion changes the boarding stop; nearby search wants a stop code | F3 Trip planning, F4 Nearby |
| Reading and waiting | No way to enlarge text; a floating button covers arrival times; on Home, live and scheduled times look the same | F1 Home, F2 Route detail, F5 Accessibility |
| Saving for next time | Saving a stop takes seven taps behind an unlabelled ≡ icon | F2 One-tap save |

*Table 3.1. Journey stages, pain points and the features that address them.*

> **Figure 3.1** Dual-track user journey map (elderly passenger / student-commuter), with emotion curve and pain points. Source: `App1933_Dual_Track_User_Journey_Map_EN_Formatted(1).pdf` (User Researcher).

## 3.3 Information architecture

The existing app spreads its functions across a bottom bar of six items: Home, Favourites, Search, Nearby, **Games**, and a grid button that opens 26 unsorted icons. We reduced this to five labelled tabs, each mapped to one user goal (Figure 3.2):

| Tab | Home | Trip | Nearby | Saved | More |
|---|---|---|---|---|---|
| Goal | When is my usual bus coming? | How do I get to a place? | What can I catch from here? | My routes and stops | Settings and accessibility |
| Main screens | F1, F1A, S5–S7 | F3, F3A, F3C, S1 | F4, F4A–F4C, S4 | F1B, F1C | F5, M1, S2–S3 |

Route detail (the F2 family: stop list, timetable, notices, alight alert) opens from Home's expanded card, the Saved list, the Nearby list and Landmarks, so a route opens the same screen wherever it is tapped. Every core screen keeps the tab bar, so users can always get back to a known place in one tap.

Screens follow a naming scheme that also structures the Figma file: **O** onboarding, **F** feature screens, **S** states and edge cases, **M** modals and sheets. The file has six sections, which follow the order of the tabs:
- 01 Onboarding & location
- 02 Home & Saved
- 03 Route detail & tools
- 04 Trip planner & route search
- 05 Nearby stops & landmarks
- 06 More & accessibility

> **Figure 3.2** Site map: five tabs and the screens under each, with route detail as a shared destination. File: [figures/site-map.png](figures/site-map.png) (SVG and Graphviz source alongside), built from the prototype links on the en-GB page. The language button on Home (EN) also opens M1; mention this in the caption rather than drawing the line.

## 3.4 Walkthrough

Two scenarios show the design end to end (Figure 3.3). Each step names the screen so markers can follow it in the public prototype. The flow "First launch (en-GB)" starts at O1. The typo screen (F3C) is not linked from the planner in the English prototype; it can be seen on the canvas.

**Scenario A: a commuter checks the bus and saves a stop.**

1. *First launch (O1).* "Welcome to App1933" states three promises: "Your routes, first", "Search by place name" and "No pop-up ads". It lets the user choose 繁體中文, 简体中文 or English before anything else.
2. *Location (O2).* "Allow location access?" explains that location is used for nearby stops, walking times and stop reminders, only while the app is in use and never for ads. It offers **Allow while using the app** or **Not now**, and notes that this can be changed later in More.
3. *Home (F1).* The first card is route 8 to Kowloon Station, with the next bus in **5 min · Live**. A status line shows the area (Near Hung Hom Station), the last update (Updated 10:32) and Auto-refresh.
4. *Expand (F1A).* Tapping route 8 expands the card in place to show the full route time (27 min), fare ($5.8), number of stops and the stop list, with the link **See full route and save stops**.
5. *Route detail (F2).* The full route lists every stop with a ☆ on each row. The current stop, Cross Harbour Tunnel ("Near you"), is expanded with its estimated arrivals (5 min Live, 30 min Scheduled) and three tools: Alight alert, Timetable and Routes here.
6. *Save (F2A).* Tapping **Save this stop** fills the star, changes the button to **Stop saved** and shows a toast, Saved "Cross Harbour Tunnel", with **Undo**. No dialog interrupts the user.
7. *Alight alert (M2 → F2D).* "Remind me before my stop" lets the user pick where to get off and how early to be alerted (1, 2 or 3 stops before), with vibrate, sound and lock-screen options. The in-progress screen counts down ("2 stops to go") and marks the stop where the alert will fire.

**Scenario B: an older passenger plans a trip without location and enlarges the text.**

1. *Location off (S4).* Choosing Not now leads to Nearby, which says "Location Services are off". It offers two equal ways forward: **Turn on location** or **Search by place name**, with popular places listed underneath.
2. *Trip planner (F3).* The origin is already filled in (My location • Hung Hom), so the user only types a destination. Suggestions show the place type and street ("Argyle Centre · 688 Nathan Rd · Shopping centre"; "Outside Argyle Centre · Nathan Rd · towards Prince Edward"), so similar names can be told apart.
3. *Results (F3A).* Three travel options are listed. The first is labelled **Recommended** and **Fastest · Direct**. It shows total time and arrival time (28 min, arrive 11:00), the fare, the legs of the journey (Walk 2 min → 87D, 6 stops) and the next bus (in 10 min, Live).
4. *Typo (F3C).* If the user types "Langham Plce", the app says what it changed ("You typed 'Langham Plce'. We think you meant 'Langham Place'.") and offers **Use my spelling** or **Correct**.
5. *Text size (F5 → S2A → S2B → Home).* In More, the text-size control steps from 100% to 150% to 200%. Returning to Home shows the larger text (the "Home / 200% text" screen). High contrast can be turned on alongside it (S2).

> **Figure 3.3** Walkthrough strips. A: O1 → O2 → F1 → F1A → F2 → F2A → M2 → F2D. B: S4 → F3 → F3A → F3C → F5 → S2B → Home at 200%.
>
> - Source: Figma en-GB page. Node IDs: O1 26:1387, O2 26:1458, F1 20:601, F1A 20:844, F2 20:1146, F2A 29:2181, M2 30:2343, F2D 30:2563, S4 26:1525, F3 20:1362, F3A 1:1126, F3C 31:2759, F5 20:2116, S2B 358:3071, Home at 200% 582:3847.
> - Export at 2× and add step numbers.

## 3.5 Design rationale

Table 3.2 lists the decisions that apply across the whole app and the principle behind each. Feature-specific decisions are in Section 4.

| Decision | Where | Principle |
|---|---|---|
| Saved routes and next arrivals are the first content on Home; no launch advert | F1 | Flexibility and efficiency of use (Nielsen, 1994, H7); intrusive ads raise irritation and avoidance (Edwards et al., 2002) |
| Every arrival carries a text label, **Live** or **Scheduled**, as well as a colour | F1, F2, F4, F3A | Visibility of system status (H1); colour is never the only cue (WCAG 1.4.1) |
| A status line shows the last update; offline and disruption states say what is wrong and what to do | F1, S5, S6, S7 | Visibility of system status (H1); real-time information builds trust only when its reliability is clear (Ferris et al., 2010; Watkins et al., 2011) |
| Five labelled tabs instead of six items plus a grid of 26 icons; settings grouped into three headed sections | Tab bar, F5 | Hick's law (Hick, 1952); recognition rather than recall (H6) |
| Primary actions are large, full-width buttons; ☆ and row targets are at least 44 pt; navigation sits in the bottom tab bar within thumb reach | All | Fitts' law (Fitts, 1954); one-handed thumb use (Parhi et al., 2006); Apple's recommended 44 × 44 pt control size (Apple, n.d.) |
| Search by place name, with the origin preset to the current location | F3, S4 | Match between system and the real world (H2); recognition rather than recall (H6); error prevention (H5) |
| Undo instead of a confirmation dialog when saving | F2A | User control and freedom (H3); permit easy reversal of actions (Shneiderman et al., 2016) |
| Errors are shown at the field that caused them, with a way to recover | S1, F3C | Help users recognise, diagnose and recover from errors (H9) |
| One labelled, closable ad space; no pop-ups, games or mascots | F1, F5 | Aesthetic and minimalist design (H8); avoiding dark patterns such as nagging (Gray et al., 2018) |
| The same components (route badge, arrival block, tab bar) behave the same on every screen | All | Consistency and standards (H4) |
| Related information is grouped in cards with clear headings | All | Grouping by proximity and a shared card (common region); no source cited yet |

*Table 3.2. Cross-cutting design decisions and the principles behind them (H1–H10 = Nielsen's heuristics).*

## 3.6 Visual language and consistency

The visual language keeps KMB's brand colour but uses it sparingly, so that it signals where to act.

- **Colour.**
  - Brand red `#C8102E` is reserved for the header, route badges, primary buttons and the active tab.
  - Content sits on white cards over a neutral grey (`#F5F5F5`) background.
  - Arrival numbers are set in near-black ink, not red, so they read as information, not warnings.
  - Status uses a small semantic set: green for Live (`#087A45` on `#E6F6EE`), amber for Scheduled and Diverted (`#9A4C00` on `#FFF1DF`), and grey for Offline and Suspended.
- **Type.** Noto Sans HK throughout, which covers Traditional and Simplified Chinese and Latin text in one family. Screen titles use Black weight and section titles Bold 20. Arrival times use the largest type on each card, as they are the information people come for.
- **Components.** A Tab Bar component (five tabs × two languages = 10 variants), a Status Bar and the official App1933 logo are shared by both language pages. Every core screen has the same anatomy: status bar, title bar or red header, content, tab bar.
- **Restraint.** We removed decorative elements that competed with the task: no mascots on the route map, no tinted icon badges, no "tap to view" filler text.

> **Figure 3.4** Style guide panel: colour swatches with hex values, type scale, route badge, arrival block (Live / Scheduled), tab bar. *To be composed by the Visual & UI Designer from the Components page and en-GB F1.*

## 3.7 Accessibility considerations

Accessibility was designed in rather than added at the end, mainly for older passengers but also for anyone reading a phone on a moving bus.

- **Text size.** More has a text-size setting in three steps, labelled 100%, 150% and 200%, and a version of Home at the largest step (Figure 3.5).
  - The steps do not scale every text style by the same factor. At "200%", headings double (20 → 40 pt), route names grow from 15 to 22 pt, and small labels from 12 to 18 pt.
  - On the More screen itself, text grows from 16 pt to 18 pt and 20 pt.
  - In the prototype the setting is drawn on More and on Home, not on every screen.
  - This supports WCAG 1.4.4 Resize Text in spirit. A built app would also follow the phone's own text-size setting, which the original app ignores (Appendix D).
- **High contrast and calm mode.** Both are labelled switches on More, with one-line explanations: "Darker text and clearer borders" and "Fewer animations, ads and extras" (S2C, S3). In a built app, calm mode would also reduce animation, in the spirit of WCAG 2.2.2 Pause, Stop, Hide and 2.3.3 Animation from Interactions. The English prototype shows the settings switched on; it does not redraw every screen in high contrast.
- **Contrast (measured).** We computed the WCAG contrast ratio of every text layer on the 31 core screens against its background: 1,155 of 1,169 meet AA.
  - Passing pairs include white on brand red and red on white (5.88:1), the secondary grey `#696969` on white (5.49:1), the Live badge (4.84:1) and the Scheduled badge (5.55:1).
  - Exceptions:
    - the past-hour figures in the timetable (4.17:1);
    - the street names on the illustrative map (3.99:1);
    - the small "Current location" label on the three Nearby screens (`#BBBBBB`, 1.92:1).
  - The dimmed A− and A+ at the ends of the text-size range (2.28:1) are inactive controls, which WCAG exempts.
- **Target size (measured).** We measured the 98 linked elements on the core screens, excluding the tab bar, whose items are about 77 × 59 pt.
  - None is smaller than 24 pt, so all meet WCAG 2.5.8 Target Size (Minimum) (W3C, 2024).
  - 84 (86%) are at least 44 pt in both directions. That is the size Apple recommends for iOS controls (Apple, n.d.) and the WCAG 2.5.5 enhanced level (W3C, 2024).
  - The smaller ones are the language button on Home (69 × 40 pt), the switches on More (50 × 30 pt) and one route badge on Landmarks (40 × 28 pt).
- **Not colour alone.** Live, Scheduled, Offline, Diverted and Suspended are always written out, often with an icon.
- **Less memory load.** Place-name search, the preset origin, suggestions with categories, and saved routes on Home all reduce what users must remember. This follows research-based guidelines for older users that favour recognition over recall and fewer choices (Zaphiris et al., 2005).
- **Choice of language and of location.** Three interface languages are offered, each listed in its own script, and every location-dependent screen has a non-location alternative (S4).

What we could not do: Figma cannot test screen-reader behaviour, so VoiceOver labels and reading order are specified only at the design level and remain untested (Section 6).

> **Figure 3.5** The same Home screen at 100% and at the largest text size, and More with high contrast on. Source: en-GB F1 (20:601), "F1 · Home / 200% text" (582:3847) and S2 (20:2596).

*Method note for the contrast and target-size figures:*
- *Computed on 8 Nov 2026 by script from the en-GB page of the Figma file.*
- *Contrast uses the WCAG relative-luminance formula on each text layer's fill (with its opacity) and the nearest filled container behind it.*
- *Target size uses the bounding box of every element with a prototype link.*
- *Backgrounds made of overlapping layers are not detected, so the figures are close estimates, not a formal audit.*

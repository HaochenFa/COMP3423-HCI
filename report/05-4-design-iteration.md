# 5.4 Design iteration: dated timeline (working draft)

**Status:** facts for §5.4 of the report and for the Lead's workload table. Not yet written as report prose. Keep to about half a page in the report, plus one figure.

**Sources.**
- The Figma file's version history (File → Show version history), read on 8 Nov 2026. Each saved version was opened, and its pages, sections, frames, prototype triggers and variable collections were counted. For the last stretch (3 Nov 21:34 → 5 Nov 17:56), layer properties (position, size, fills, text, bindings, links) were also compared frame by frame.
- The pre-Figma artefacts and their file dates.

Figma labels each version by the time its session ended. Times below are HKT.

## Figma accounts and members (confirmed 8 Nov 2026)

| Account in version history | Member | Role |
|---|---|---|
| haochen.fa | Haochen Fa | Project Lead & UX Strategist |
| LO Li-en | Li-En Lo | Visual & UI Designer |
| Anosia | Xulu Zhang | Interaction Designer |
| KML | Moling Kong | Accessibility & Evaluation Lead |
| (not in Figma history) | Chenyang Zhang | User Researcher (Maze test design and running) |

**Division of design work (stated by the team, 8 Nov 2026):**
- **Li-En Lo** made the initial hi-fi design (v1).
- **Haochen Fa** improved and extended every screen from it.
- **Xulu Zhang** improved the interaction.
- **Moling Kong** did the accessibility work.

The version history agrees with this.

## Timeline

| When | Version(s) in Figma | Who | What changed (as recorded in the file) |
|---|---|---|---|
| 1 Oct | — | User Researcher | Dual-track user journey map (PDF) |
| 11 Oct | — | Visual & UI Designer | Hand-drawn wireframe sketch (photo), redrawn as a digital wireframe |
| 12 Oct | — | All | Mid-project checkpoint: sketch → wireframe → first hi-fi screens for all five features |
| 28 Oct 14:17–14:39 | "Oct 28, 2:39 PM" (earliest in this file) | Visual & UI Designer (Li-En Lo); file set up with the Lead | **v1, Li-En Lo's initial hi-fi design:** one page, six sections, 13 screens at 390 × 844 shown in rounded device mock-ups: F1, F1A, F2, F3, F3A, F3B (a single "English UI" demo screen), F4, F4A, F5, M1, S1, S2, S3 |
| 28 Oct 14:50–15:18 | "Oct 28, 3:18 PM" | Lead (Haochen Fa) | **v1 improved and expanded to the full flow:** 28 screens, each in a zh-HK and an en-GB row (F3B dropped). New: onboarding O1, O2, location-off S4; Saved F1B and its empty state F1C; loading S5, offline S6, black-rainstorm disruption S7; route tools F2A save-with-Undo, F2B timetable, F2C service notices, M2 and F2D alight alert; F3C corrected destination with Undo; F4B landmarks, F4C map. First components: Tab Bar, Language Switch, Status Bar, Logo placeholder |
| 28 Oct 15:28–15:53 | "Oct 28, 3:53 PM" | Lead (Haochen Fa) | **Prototype and comparison boards:** first prototype links (about 550), with flows "First launch" and "Home" in each language. New page "Original vs Redesign" with 8 sections. The 18 zh-HK screens it shows were turned into components |
| 28 Oct (same day) | — | Lead (Haochen Fa), refining Li-En Lo's initial design | Visual clean-up (project notes): no eyebrow labels, no pink tints, no black hero or tip cards, no "tap to view" filler; red kept for header, route badges, primary buttons and the active tab; ETA numbers in ink |
| 29 Oct 23:23–23:44 | "Oct 29, 11:44 PM" | Lead (Haochen Fa) | **Split by language:** separate pages "App Screens · 繁體中文 zh-HK" and "App Screens · English en-GB", plus a Components page. Three accessibility states added in both languages: S2A text 150%, S2B text 200%, S2C high contrast, giving 31 screens per language |
| 29 Oct 23:53 – 30 Oct 00:15 | "Oct 30, 12:15 AM" | Lead (Haochen Fa) | All screens resized from 390 × 844 to 402 × 874 (iPhone 18 Pro). Placeholder logo replaced by the official App1933 icon. Floating Language Switch component deleted (language now changes from the Home button or More → Language). Status bar rebuilt on Apple's iOS 26 kit (project notes, 30 Oct) |
| 2 Nov 17:06–17:55 | "Nov 2, 5:28 PM", "5:55 PM" | Interaction Designer (Xulu Zhang) | Work on the existing screens; first test variable collection |
| 2 Nov 18:12–18:40 | "Nov 2, 6:40 PM" | Interaction Designer (Xulu Zhang) | **Variables-driven prototype:** collections *Accessibility · 字體* (36 variables; modes 100% / 150% / 200%), *Accessibility · 對比* (41; standard / high contrast), *Prototype · 語言* (326 so far; 繁體中文 / English / 简体中文) and *Prototype · 狀態* (34 so far). New zh-HK section *互動補全 · 選擇與回饋* (49 dialog and feedback frames). About 400 prototype triggers on zh-HK |
| 2 Nov 18:45–19:28 | "Nov 2, 7:14 PM", "7:28 PM" | Interaction Designer (Xulu Zhang) | New section *07 · 完整路線詳情 · 繁簡英* (14 frames: full stop lists for 87D, 101, 116, 11K, 5C, 21, 1A in both directions). State variables 2,139, language variables 2,519. About 3,000 triggers |
| 2 Nov 19:55–20:49 | "Nov 2, 8:19 PM", "8:49 PM" | Interaction Designer (Xulu Zhang) | New section *08 · 搜尋、提醒與收藏管理* (48 frames: search, alight-alert and favourites-management flows). State variables 2,599. About 5,200 triggers |
| 2 Nov 21:02–22:23 | "Nov 2, 9:28 PM", "10:23 PM" | Interaction Designer (Xulu Zhang) | Wiring completed: 142 frames on zh-HK, about 5,350 triggers, state variables 2,614, language variables 2,593 |
| 3 Nov 09:09–09:15 | "Nov 3, 9:15 AM" | Accessibility & Evaluation Lead (Moling Kong) | **Accessibility acceptance check:** frame *驗收 · 首頁 200%* added to zh-HK section 06 (Home rendered at 200% text). After this save the zh-HK page's frames, texts and link counts never change again |
| 3 Nov 10:18 and 21:34 | "Nov 3, 10:18 AM", "9:34 PM" | Accessibility & Evaluation Lead (Moling Kong) | en-GB page: frame *F1 · Home / 200% text* added (39 frames). This is the page later used for the Maze test |
| 5 Nov 16:14–17:56 | "Nov 5, 4:40 PM" → "5:56 PM" (4 saves) | Accessibility & Evaluation Lead (Moling Kong) | **Accessibility pass on the arrival rows** in both languages: 15 zh-HK and 14 en-GB screens (Home F1/F1A, Saved F1B, offline S6, disruption S7, route detail F2/F2A, alert set-up M2, Nearby F4/F4A, map F4C; en-GB also F3A, F3C). On route detail, the 實時 / 預定 (Live / Scheduled) badge moved from the far right to sit next to the minutes. On cards, route rows grew from 73 to 79 pt and ETA blocks from 54 to 60 pt. The 200% check frames were updated to the larger type (16 → 22 pt). **Last save of the design** |
| after 5 Nov 17:56, by 8 Nov | — | User Researcher | Maze test on the en-GB page (9 participants); report downloaded 8 Nov. No design changes since (frozen) |

## How to use this in the report

- **Figure (done):** [figures/iteration/F1-home-iteration-strip.png](figures/iteration/F1-home-iteration-strip.png), Home F1 (zh-HK) at 28 Oct 14:39, 30 Oct 00:15 and 5 Nov 17:56, captured from the version history. The single captures are in the same folder. What the strip shows:
  - v1 still has eyebrow labels (快捷到達, 步行可達), pink-tinted arrival rows, red ETA numbers and a floating 繁體中文 pill.
  - v2 removes all four (the visual clean-up), adds the status bar and the official icon, and moves the language control to the header button.
  - The final adds the two-line status block. Its search bar is thinner (24 pt), which is listed as a limitation.
  - For a sharper print version, export the same frames at 2× from version history (open the version, select the frame, Export PNG).
- **Optional second figure:** route detail F2 arrival row, 3 Nov 21:34 vs 5 Nov 17:56 (badge moved beside the minutes). This is the only before/after pair that sits next to an evaluation step.
- **Growth line for the text:** 13 screens (28 Oct) → 56 bilingual screens (28 Oct) → 62 on two pages (29 Oct) → 142 frames driven by variables on zh-HK (2 Nov).
- **Honest framing for rubric item "prototype visibly changed in response to test findings":**
  - No change responded to the Maze test, because the design was frozen before it ran. Say so.
  - The design did iterate before the test, in three passes, each with its own owner. Haochen Fa improved and extended Li-En Lo's v1 (28–30 Oct). Xulu Zhang made the prototype fully interactive (2 Nov). Moling Kong reviewed accessibility (3–5 Nov). Present these as dated v1 → v2 → v3 steps.
  - The accessibility pass is the closest to "changed in response to findings": a 200% acceptance check (3 Nov), then layout changes to the arrival rows (5 Nov). Describe it as iteration after our own accessibility review: an expert check, not user testing. Before giving a specific cause for a change (e.g. "rows were made taller because text was clipped at 200%"), confirm it with Moling.
  - The accepted test findings (§2 of the plan) go to Future Work as proposed changes for the next version.
- **Workload table:** each member's "key tasks" cell can cite their own dated rows above:
  - Li-En Lo: v1 hi-fi design and style.
  - Haochen Fa: improvement and expansion of every screen, the two language pages, device size.
  - Xulu Zhang: interactive prototype, variables, dialogs, full route and search flows.
  - Moling Kong: 200% checks and the arrival-row accessibility pass.
  - Chenyang Zhang: Maze test.

## Not recorded in the file

- What the 17:06–17:55 session on 2 Nov changed. The counts and structure are unchanged; property-level detail was not compared for that stretch.
- Whether any change was made after a pilot or informal feedback before the Maze test. Ask the team. If one was, it counts as iteration evidence.
- The exact session of the visual clean-up. The Home strip shows it happened between 28 Oct 14:39 and 30 Oct 00:15, and the project notes date it to 28 Oct. The 16:03–16:10 session made no structural change, which fits a styling pass.
- The file's history starts on 28 Oct. The checkpoint report (12 Oct) mentions 14 screens in Figma, but the earliest version here has 13. The single-language F3B demo screen may be the difference, or the earlier work may be in another file. Check before writing "14".

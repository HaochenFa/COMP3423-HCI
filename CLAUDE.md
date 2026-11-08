# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This folder holds the materials for a COMP3423 (Human–Computer Interaction, PolyU) group project: redesigning **App1933**, the official app of Kowloon Motor Bus and Long Win Bus (KMB · LWB). It contains no code, so there is nothing to build, lint or test. The work happens in documents, screenshots and a Figma file.

- `Group-Project-Description.pdf`: the brief and the full grading rubric (Appendix II). Due **15 Nov 2026, 23:59**. Deliverables: a report (Word or PDF, at most 20 pages), a PPT, a video of at most 10 minutes, a public Figma prototype covering at least 5 features, and a Maze test with at least 5 real participants.
- `COMP3423_Mid-Project_Checkpoint_App1933.docx`: the checkpoint report. It covers team roles, target users (elderly passengers; students and commuters), the user journey, features F1–F5 and the Maze plan. It is the main source for project decisions.
- `original-app-screenshots/`: screenshots of the real existing app (v2.3.38), in Traditional Chinese. File names follow `t<N>-<what is wrong>.png`, where `t1`–`t7` group them by area, roughly onboarding, save, search, planner, nearby, menu and misc. `cropped/` has byte-identical copies of the PNGs plus two annotated phone captures, `moling-*.jpeg`, by Moling Kong.
- `assets/`: the official App1933 icon (`icon-app1933_gplay_512px.png`).
- `user-test/`: the completed Maze test (9 participants, run in English on the en-GB prototype). `maze_official_report.pdf` is the 50-page Maze report, image-only, so `pdftotext` returns nothing: render pages with `pdftoppm` to read them. `user_feedback.docx` holds the researcher's per-task coding (direct, indirect, failed), ease ratings and participants' comments. `maze-figures.md` is a page-referenced transcription of the Maze PDF: use it to look up numbers, and cite the PDF page. `user-test-summary.docx` is a **secondary write-up**: its recommendations and interpretations are not the participants'. Never cite it as evidence; the evidence is the Maze PDF and `user_feedback.docx`.
- Project documents (report drafts, plan, slides, notes) present all work as the group's. They never mention the tools used to produce the design or the documents.
- `final-deliverables-plan.md`: the plan for the final report, slides and video, including the findings-and-position table for the Discussion.
- `report/`: Markdown drafts of report sections (`03-overall-design.md`, `04-feature-details.md`), written from the frozen Figma file, and `05-4-design-iteration.md`, the dated design timeline taken from Figma version history. The final report is Word or PDF.

## Status (8 Nov 2026)

- The Maze test is done and the **Figma design is frozen**. Do not change screens in response to test results. The report presents all results without cherry-picking, but weighs each piece of feedback on its merits: where a design follows established practice (e.g. text size under More / Settings, as in virtually every app), the report defends the design instead of conceding the point.
- Report text about the design must describe what is actually in the Figma file, not what earlier documents planned.
- The extra working directory `~/Documents/PolyU/Y3S1/COMP3423 Human Computer Interaction/` holds lecture PDFs, the wireframe sketch and the dual-track user journey map PDF.

To read the binary documents from the shell:

```bash
textutil -convert txt -stdout COMP3423_Mid-Project_Checkpoint_App1933.docx
```

```bash
pdftotext -layout Group-Project-Description.pdf -
```

## The five features

| Code | Feature | Core change |
|---|---|---|
| F1 | Home | Saved routes first; arrivals labelled 實時 (Live) or 預定 (Scheduled); no pop-up ads |
| F2 | One-tap save | 44 pt ☆ on every stop; labelled 收藏 button; Undo instead of a pop-up |
| F3 | Trip planning | Search by place name; origin defaults to current location; AI changes can be undone |
| F4 | Nearby stops and landmarks | Street, walking time and next bus; landmarks with category and buses |
| F5 | More menu and accessibility | Grouped menu; text size up to 200%, high contrast, calm mode |

## Figma file

https://www.figma.com/design/2JkOkm1pztoaZask0fDJeq/APP1933-KMB.LWB-Redesign (file key `2JkOkm1pztoaZask0fDJeq`). The project enables the Figma plugin, and the official Figma MCP server can read and write the file.

- Since 29 Oct 2026 each language has its own page: **App Screens · 繁體中文 zh-HK** (first page, ID `360:2542`) and **App Screens · English en-GB** (the original page, ID `0:1`, used for the English Maze test). Both have sections `01`–`06` with the same 31 core 402×874 screens. Screen-code prefixes: `F` for feature screens, `O` for onboarding, `S` for states and edge cases, `M` for modals and sheets. Frame names follow `<code> · <Area> / <State> — <locale>`.
- As of 8 Nov 2026 the **zh-HK page is the full design**: 142 frames and 18,461 prototype interactions. Besides the core screens it has extra sections `互動補全 · 選擇與回饋` (dialogs), `07 · 完整路線詳情 · 繁簡英` (full route detail for 87D, 101, 116, 11K, 5C, 21 and 1A in both directions, stop order from KMB open data) and `08 · 搜尋、提醒與收藏管理` (search, alight-alert and favourites-management flows). It is driven by local variable collections: `Prototype · 狀態` (≈2,600 state variables), `Prototype · 語言` (繁體中文 / English / 简体中文 modes, so language switches inside the prototype), `Accessibility · 字體` (100% / 150% / 200% text modes) and `Accessibility · 對比` (standard / high contrast). The **en-GB page** uses plain navigation links only, with no variables (plus an extra `F1 · Home / 200% text` frame), and is less interactive.
- Cross-page links are impossible, so the en-GB page has no switch to Chinese; its globe button and More → Language open its own M1 picker.
- **Components 元件** page: section `07` with the local components used by both locales: Tab Bar (10 variants, zh-HK and en-GB columns), Status Bar and Logo. The Logo is the official App1933 icon (`icon-app1933_gplay_512px.png`) clipped to a rounded tile; `Ring=White` sits on the red header, `Ring=None` on white screens.
- Languages: the app offers 繁體中文, 简体中文 and English only, matching the original app. The M1 sheet lists them as radio rows, each name in its own script, and onboarding (O1) has the same three as a segmented control.
- **Original vs Redesign 原版對比** page: 8 sections that put the original screenshots (uploaded as image fills) beside **instances** of the matching zh-HK screens. To keep those instances in sync, the 18 zh-HK screens they use are components on the zh-HK page. The other screens are still plain frames. Edit the components on the zh-HK page, never the instances.
- Turning a frame into a component gives it a **new node ID**. Figma moves prototype links to the new ID automatically, but `page.flowStartingPoints` do not follow. Record them before converting and reset them afterwards.
- Visual language: Noto Sans HK throughout, with Black weight for headings. Brand red `#C8102E`, white sections. Screens are bare 402×874 frames (iPhone 18 Pro, resized from 390×844 on 29 Oct 2026) with no corner radius, bezel or shadow; the phone hardware comes from Prototype → Device (iPhone 18 Pro), which only shows in Present mode and prototype links, not in exports. The status bar stays in the design because Figma's device frame does not draw it: the local 402×62 Status Bar component wraps an instance of Apple's "Status bar - iPhone" from the "iOS and iPadOS 26" community library (added 30 Oct 2026), with the time set to 10:32 to match the screen content and the kit's Dark colour mode on the red-header variant. The screens have no home indicator. Headers carry 26 pt extra top padding to clear the 62 pt status bar. The plugin API cannot import from that library ("Not permitted to upsert"), so to use another of its components, drag one onto the canvas first and create instances from its main component. The file has no styles; colours and type are hard-coded on the en-GB page and bound to the variable collections above on the zh-HK page.
- Noto Sans HK renders curly quotes (`’ “ ”`) full-width in Latin text. Use straight quotes in English copy.
- On 28 Oct 2026 the screens were cleaned of patterns that made them look AI-generated. Keep it that way:
  - No floating language pill. Language is changed with the 繁/EN button on Home or 更多 → 語言.
  - No eyebrow labels above section titles. Section titles are Bold 20.
  - No pink tints. Containers are neutral (`#F5F5F5`) and icons sit without a tinted badge.
  - No black hero or tip cards.
  - No logo on secondary title bars.
  - No "tap to view" filler text.
  - ETA numbers are ink, not red.
  - Red is kept for the header, route badges, primary buttons and the active tab.

## Content conventions

- The interface is bilingual: Traditional Chinese for Hong Kong (zh-HK) first, then English with British spelling (en-GB), e.g. Favourite, Centre. Labels on boards and pages pair the two, e.g. `02 · Home & Saved  主頁及收藏`.
- The rubric gives zero marks for any item without real evidence. So:
  - "Before" images must be real screenshots of the existing app. Never generate, mock up or retouch them.
  - Maze results, participant quotes and references must be real. Never invent or pad them.
  - Iteration evidence means dated v1 and v2 comparisons; Figma version history counts.
  - The Figma link must stay publicly viewable by the markers.
- Every design decision should be tied to a named HCI principle (Nielsen's heuristics, Fitts' law, Hick's law, WCAG criteria), as the checkpoint report does.

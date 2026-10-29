# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This folder holds the materials for a COMP3423 (Human–Computer Interaction, PolyU) group project: redesigning **App1933**, the official app of Kowloon Motor Bus and Long Win Bus (KMB · LWB). It contains no code, so there is nothing to build, lint or test. The work happens in documents, screenshots and a Figma file.

- `Group-Project-Description.pdf`: the brief and the full grading rubric (Appendix II). Due **15 Nov 2026, 23:59**. Deliverables: a report (Word or PDF, at most 20 pages), a PPT, a video of at most 10 minutes, a public Figma prototype covering at least 5 features, and a Maze test with at least 5 real participants.
- `COMP3423_Mid-Project_Checkpoint_App1933.docx`: the checkpoint report. It covers team roles, target users (elderly passengers; students and commuters), the user journey, features F1–F5 and the Maze plan. It is the main source for project decisions.
- `original-app1933-screenshots/`: screenshots of the real existing app (v2.3.38). File names follow `t<N>-<what is wrong>.png`, where `t1`–`t7` group them by area, roughly onboarding, save, search, planner, nearby, menu and misc. `cropped/` has byte-identical copies of the PNGs plus two annotated phone captures, `moling-*.jpeg`, by Moling Kong.
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

- **App Screens** page: sections `01`–`07`. Each section has a zh-HK row (top) and an en-GB row (bottom) of 390×844 screens. Screen-code prefixes: `F` for feature screens, `O` for onboarding, `S` for states and edge cases, `M` for modals and sheets. Frame names follow `<code> · <Area> / <State> — <locale>`. Section `07` holds local components (Tab Bar, Language Switch, Status Bar). The prototype has about 530 links and four flow starts (first launch and Home, one each per locale).
- **Original vs Redesign 原版對比** page: 8 sections that put the original screenshots (uploaded as image fills) beside **instances** of the matching zh-HK screens. To keep those instances in sync, the 18 zh-HK screens they use are components on App Screens. The other screens are still plain frames. Edit the components on App Screens, never the instances.
- Turning a frame into a component gives it a **new node ID**. Figma moves prototype links to the new ID automatically, but `page.flowStartingPoints` do not follow. Record them before converting and reset them afterwards.
- Visual language: Noto Sans HK throughout, with Black weight for headings. Brand red `#C8102E`, white sections, screens with corner radius 28 and a bezel made from an 8px `#222` spread shadow plus a soft drop shadow. The file has no variables, styles or library, so values are hard-coded and new work should match the existing screens.
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

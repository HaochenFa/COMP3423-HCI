# Appendix D. Accessibility audit of the existing app (working draft)

**Status:** complete (8 Nov 2026). Contrast, target size and text scaling were measured, and text scaling was tested on an iPhone. Screen-reader support (check 10) was judged from what the app exposes to assistive technology. We did not run a VoiceOver session; this is stated as a limitation. Owner: Accessibility & Evaluation Lead (Moling Kong).

**App audited:** App1933 v2.3.38 (KMB · LWB), the iPhone app, run on a Mac with Apple silicon at the size of a 375 × 667 pt iPhone screen. Interface language 繁體中文.

**Phone check:** on 8 Nov 2026 we also took iPhone screenshots of v2.3.39: the launch advert, Home, Saved, Search, Games, the More menu and Nearby (`*-iphone-*.png`, `t1-launch-fullscreen-ad.png`). They were shared at 920 × 2000 px with lossy compression. For them, the text colour is taken as the 95th percentile of text pixels instead of the single extreme pixel, so compression artefacts cannot inflate the ratio. Script: [figures/audit/contrast_iphone.py](figures/audit/contrast_iphone.py). Every contrast failure found on the Mac build appears on the phone with the same ratio to within 0.05.

## Method

| Check | How it was measured |
|---|---|
| Contrast (WCAG 1.4.3, 1.4.11) | Text and background colours were sampled from the lossless PNG screenshots in `original-app-screenshots/` (576 × 1082 px). The text colour is the sampled pixel furthest from the background, which removes anti-aliasing. Ratios use the WCAG 2.2 relative-luminance formula. Script: [figures/audit/contrast.py](figures/audit/contrast.py). |
| Target size (WCAG 2.5.8; Apple's 44 × 44 pt) | Control bounds were read from the app's accessibility tree where exposed, otherwise measured in the screenshots. Sizes are converted to iOS points: the 288 pt wide window shows a 375 pt wide iPhone screen, a factor of 1.30. |
| Text scaling (WCAG 1.4.4) | The More menu was searched for a text-size setting, and the screenshots were checked for text that is already cut off at the default size. The response to the iPhone's own text size is still to be tested (see the phone steps). |
| Screen reader (WCAG 1.1.1, 4.1.2) | On each main screen we listed which elements the app exposes to assistive technology, with their names and roles, through the macOS accessibility interface (the same information Accessibility Inspector shows). |

## Results

| # | Check | Criterion | Result | Evidence |
|---|---|---|---|---|
| 1 | Body text, stop names, fares, arrival times, tab labels | 1.4.3 (4.5:1) | **Pass.** Black or near-black text on white, 14.7:1 to 21:1. Blue arrival minutes 9.4:1 (route detail) and 10.6:1 (Saved). Selected tab label in red 6.0:1. | `t1-home-no-location.png`, `t2-stop-expanded-unlabelled-icons.png`, `t2-favourites-after-save.png` |
| 2 | White text on the red header | 1.4.3 | **Pass, narrowly.** #FFFFFF on #D1383A = 4.84:1 (Mac build); on the iPhone the red renders as #E51E32, 4.60:1. | Figure D.1, panel 4; `t1-home-iphone-no-nearby-stops-banner-ad.png` |
| 3 | Search placeholder 輸入路線號碼 (the only hint of what to type) | 1.4.3 | **Fail.** #DBDBDB on white = 1.38:1 (iPhone: 1.36:1). | Figure D.1, panel 1; `t3-search-iphone-keypad-banner-ad.png` |
| 4 | Nearby screen: unselected mode buttons, selected mode button, empty-state message | 1.4.3 | **Fail.** Unselected buttons: white on #BABBBB = 1.92:1 (iPhone: 1.92:1). These are working buttons, not disabled ones, so the exemption for inactive controls does not apply. On the iPhone the selected button is white on #5F7D8C = 4.31:1. With no stop nearby, the only message on the screen, 鄰近沒有任何車站, is #C9C9C9 on white = 1.66:1. | Figure D.1, panel 2; `t5-nearby-iphone-no-stops.png` |
| 5 | White text on the slate bars: Saved section bar 收藏車站, planner summary bar 車程 / 總車資 | 1.4.3 | **Fail, narrowly.** White on #667C89 = 4.37:1 (iPhone: #5F7D8C, 4.37:1). | Figure D.1, panel 3; `t4-planner-N368-no-service-clipped.png`; `t2-saved-iphone-empty-no-hint.png` |
| 6 | Unused letters on the stop-code keypad (B, D, G, I …) | 1.4.3 | **Exempt.** 1.35:1, but they are disabled keys, which WCAG exempts. | `t5-nearby-stop-code-entry.png` |
| 7 | Icons against their background | 1.4.11 (3:1) | **Pass.** Tab icons 13.0:1; stop action icons (slate circles on white) 4.37:1; favourite star 6.8:1. | Figure D.1, panels 5–6 |
| 8 | Touch-target size | 2.5.8 (24 pt); Apple 44 pt | **Mixed.** Large enough: tab bar 59 × 62 pt, More button 48 × 48, More grid cells 86 × 61, search keypad keys 70 × 51 and 46 pt circles, stop-code keys 44 × 39, Nearby mode buttons 88 × 46. Meet 24 pt but are under 44 pt: route header icons (timetable, notices, swap) 29 pt; the four stop action icons 26 pt across with centres 33 pt apart; language options 300 × 39; back button 43 × 46. **Fail 2.5.8:** the favourite star in planner results (a box about 17 pt wide) sits inside the result row, which is itself a target, so the spacing exception cannot apply. The planner field's clear button is about 20 pt and sits inside the field; if it is the iOS system clear button, WCAG's user-agent exception covers it. The Saved edit pencil is a 15 pt glyph; its tap area is not exposed, so it could not be measured. The skip button on the full-screen advert shown at launch is 53 px wide on a 920 px phone capture: 6% of the screen width, roughly 22–25 pt on a phone 375–430 pt wide. That is about the 24 pt minimum and well under 44 pt, and it is the only way past the advert. | Figure D.1, panels 5–6; `t1-launch-fullscreen-ad.png` |
| 9 | Text scaling | 1.4.4 | **Fail.** *System setting:* the app ignores the iPhone's text size. With Larger Accessibility Sizes on and the slider at its maximum (v2.3.39, 8 Nov, 21:32), Home text is exactly the size it was at 21:23: APP 1933 218 × 32 px, 附近沒有車站 186 × 29 px, tab label 收藏 50 × 24 px in both captures (Figure D.2). *In the app:* the More menu has 26 items (九巴會員 … 使用條款; all visible in the iPhone capture of v2.3.39), and none of them changes text size. At the default size, text is already cut off in four places: Home row 中環 (港澳碼頭) -…, route title 8 往 九龍站,高鐵站 (YT…, planner stop 16. HH600) 紅隧轉車 (cut mid-word with no ellipsis) and 暫時沒有預定班次 (. Larger text would make this worse. A passenger who needs bigger text has no way to get it in App1933. | Figure D.2; `t8-a11y-ios-larger-text-max-setting.png`, `t8-a11y-home-at-max-text-size.png`, `t1-home-no-location.png`, `t2-stop-expanded-unlabelled-icons.png`, `t4-planner-N368-no-service-clipped.png`, `t6-menu-grid-iphone-26-items.png` |
| 10 | Screen-reader names and roles | 1.1.1, 4.1.2 | **Fail (by inspection; no VoiceOver session).** *Exposed with useful names:* the six tab buttons (主頁, 收藏, 搜尋, 鄰近, 遊戲, 其他頁面目錄); all 26 items in the More menu; the three language options; the route back button; stop markers on the route map. *Not exposed at all:* on Home, the route rows, the advert banner, the location prompt, the weather and fare buttons, and the 想去邊度 trip-planner button; on route detail, the timetable, notice and swap icons and the whole stop list, including the four stop action icons; on Saved, the saved stop and its arrival time, and the edit button; on Search, the keypad and the result list; on Nearby, the stop-code keypad and the three mode buttons. *Wrong role:* the More menu's 關閉 (Close) is exposed as plain text, not as a button; the search box is exposed as static text, not as a text field. *Language:* the back button is named "Go back" in English while the interface is in Chinese (3.1.2 Language of Parts). | Table D.2 |

> **Figure D.1** Contrast failures and small targets in App1933 v2.3.38. File: [figures/audit/appendix-d-contrast-targets.png](figures/audit/appendix-d-contrast-targets.png). Red boxes are contrast failures, green is a pass, blue marks measured targets.

> **Figure D.2** App1933 ignores the iPhone's text size. (a) Home before the change; (b) iOS Larger Text with Larger Accessibility Sizes on and the slider at maximum; (c) Home at that setting, with every measured text box the same size as in (a). File: [figures/audit/appendix-d-text-scaling.png](figures/audit/appendix-d-text-scaling.png).

**Table D.2 (for the appendix): what each main screen exposes.**

| Screen | Exposed (name · role) | Not exposed |
|---|---|---|
| Home | APP 1933 · text; 6 tab buttons | Route rows, banner, location prompt, weather, fare button, 想去邊度 |
| Route detail (route 8) | "Go back" · button; stop markers on the map | Header icons, stop list, ETAs, stop action icons |
| More menu | 26 items · button; 關閉 · plain text (no button role) | — |
| Language dialog | 繁體中文, 简体中文, English · button | No cancel option exists to expose |
| Search | 搜尋 · text; 輸入路線號碼 · text (should be a text field) | Keypad, results |
| Nearby | 鄰近 · text | Instruction, stop-code keypad, mode buttons |
| Saved | 收藏 · text | Saved stop row, ETA, edit button |

**Limits of check 10.** The app is built with React Native, which passes accessibility information to iOS. We read that information on a Mac rather than listening to VoiceOver on an iPhone.
- VoiceOver may read more than the Mac shows, for example the text inside a route row, so the "not exposed" list is an upper bound.
- The icon-only controls (stop actions, header icons, edit) have no text inside them to fall back on, so their missing labels are the most secure part of the finding.
- In the report, write "not exposed to assistive technology in our inspection", not "VoiceOver cannot read".

## Phone checks

1. **Text size (check 9): done 8 Nov.** The app did not change (Figure D.2).
2. **VoiceOver (check 10): not done (team decision, 8 Nov).** Check 10 rests on the accessibility-tree inspection above. If time allows later, a 10-minute VoiceOver run would firm it up:
   - three tasks: from Home, open route 1 and hear the next arrival; save a stop; search for 116 with the keypad;
   - screen recording with the microphone on;
   - note what is announced for the four stop icons, the header icons and the floating 智能問路 button.

## Lines for the report (§2 or §4, about 60 words)

> We audited App1933 v2.3.38 against four WCAG basics and repeated the contrast checks on an iPhone running v2.3.39 (Appendix D). Main text passes contrast, but the search placeholder (1.4:1), the Nearby mode buttons (1.9:1) and empty-state message (1.7:1), and the slate section bars (4.4:1) fail WCAG 1.4.3. The four stop icons are 26 pt, below the 44 pt guideline, and the planner's star fails WCAG 2.5.8. The app has no text-size setting and ignores the iPhone's own text size even at its maximum. In our inspection, most of the app's content and all of its icon-only buttons were not exposed to assistive technology such as screen readers.

## How the redesign answers each finding

| Finding | Redesign (frozen Figma file) |
|---|---|
| 3 Low-contrast placeholder | Secondary text is `#696969` or darker (5.49:1, §3.7). Exception: the 目前位置 label on Landmarks (F4B) is 1.92:1, listed as a limitation |
| 4–5 White text on light grey or slate | Neutral `#F5F5F5` containers with ink text; red only for the header, route badges, primary buttons and the active tab; white on brand red 5.88:1 |
| 8 Small targets | Of 657 tappable elements on the core screens, none is under 24 pt and 90% are at least 44 pt (§3.7); 44 pt ☆ on every stop (F2). Exception: the Home search bar is 24 pt tall (limitation) |
| 9 No text scaling | F5: text size 100% / 150% / 200% under More, applied app-wide (S2A, S2B). Limitation: More at 200% has overlapping text |
| 10 Unlabelled icons | F2: the expanded stop shows three labelled tools (下車提示, 時間表, 途經路線) and a full-width 收藏此站 button instead of four bare icons. Screen-reader labels cannot be built in a Figma prototype, so they go to future work (§3.7) |

All redesign facts in this table come from §3.7 and §4, which were written from the frozen Figma file.

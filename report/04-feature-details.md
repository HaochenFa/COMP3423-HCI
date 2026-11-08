# 4. Feature Details

> Draft, 8 Nov 2026, written from the frozen Figma file. Target length 4–6 pages: about one page per feature, each with an annotated "before" figure and a before/after figure. This full draft is about 2,400 words; to fit, cut each feature to about 250 words and merge its two figures into one before/after figure. "Before" images must be the real screenshots in `original-app-screenshots/` (or the phone captures already placed on the Figma "Original vs Redesign 原版對比" page); callouts are added on top, never by editing the screenshot. "After" images come from the zh-HK page, so that both sides are in Chinese. Screen codes match the Figma frame names. Each feature notes which Maze mission tested it; results are discussed in Section 5.

---

## 4.1 F1 Home: saved routes first, honest arrival times, no pop-up ads

**(a) Problem in the existing app.** On a phone, a full-screen bank advert can cover the whole app (Figure 4.1a, centre). Home leads with a rotating banner of quizzes and promotions, a floating "想去哪里" button covers part of the list, and a second banner advert sits at the bottom (right). Routes are listed by stop, not by what the user saved. On Home and in 收藏, the arrival column shows bare numbers, so a live estimate and a scheduled departure look the same; only the expanded stop in route detail adds 預定班次 (Scheduled) to scheduled times. The bottom bar gives a whole tab to mini-games.

> **Figure 4.1a** Annotated originals: [figures/annotated/F1-home-annotated.png](figures/annotated/F1-home-annotated.png). Sources: `cropped/moling-ads-interstitial.jpeg` (three phone captures, app set to Simplified Chinese) and `t7-games-tab.png`. Callouts: ① full-screen advert covering the app; ② rotating quiz and promotion banner; ③ floating button covering arrival times; ④ banner advert in the list; ⑤ arrival minutes with no Live/Scheduled label; ⑥ Games tab in the main navigation.

**(b) HCI principles.** *Violated:* user control and freedom (H3) and flexibility and efficiency of use (H7), since the user must wait for or dismiss an advert to reach the one piece of information they came for; visibility of system status (H1), because live and scheduled times cannot be told apart; aesthetic and minimalist design (H8). Forced, interrupting adverts are a known cause of irritation and avoidance (Edwards et al., 2002), and making them hard to dismiss is a dark pattern (Gray et al., 2018). For older passengers in our journey research, a sudden full-screen advert also looked like a scam. *Applied:* H7, H1, H3, H8.

**(c) Redesign** (Figure 4.1b).

- **Saved routes first (F1).** Under the red header, the first section is 我的收藏 (My favourites): one card per saved route with the destination, boarding stop and the next arrival in the largest type on the card.
- **Every time is labelled.** Each arrival carries a green **實時** (Live) or amber **預定** (Scheduled) badge, so the label, not only the colour, tells the user how far to trust it.
- **Status line.** Location (紅磡站附近), last update (更新於 10:32) and 自動更新 (auto-refresh) sit directly under the header.
- **Expand in place (F1A).** Tapping a route opens the card to show journey time, fare, number of stops and the stop list, with a link to the full route. The user gets more detail without losing their place.
- **One honest ad space.** A single card marked "Ad · Sponsored" at the end of Home, with a close button. Calm mode (F5) removes it entirely. No launch advert, no pop-ups, no Games tab.
- **States.** S5 shows a skeleton while times load; S6 says the phone is offline, keeps the last times greyed and labelled 離線 (Offline) with their timestamp, and offers 重試 (Retry); S7 shows a Black Rainstorm warning, marks route 8 as **暫停服務** (Suspended) and 87D as **改道** (Diverted), and links to the affected routes.

> **Figure 4.1b** Before/after. Left: original Home (from 4.1a). Right: F1 (45:2438), F1A (45:2439), S6 (28:1697), S7 (28:1923). The Figma board "02 · F1 Home 主頁" on the Original vs Redesign page already pairs them.

**(d) Rationale.** Our two groups both open the app to check one bus, often in a hurry, so the first screen should answer that question with no extra step (H7). Live labels matter because real-time information only reduces waiting stress when riders can trust it (Ferris et al., 2010; Watkins et al., 2011), and the offline and disruption states keep that trust when the data is stale or the service is not running. We kept one advert because the operator relies on advertising income, but made it predictable, labelled and closable instead of interruptive. *Tested in Maze: blocks 2–3 (next Bus 8, route duration).*

---

## 4.2 F2 One-tap save and route detail

**(a) Problem in the existing app.** In route detail, the selected stop shows a column of four unlabelled round icons (bell, clock, pin, ≡) next to decorative district trivia (Figure 4.2a, left). Saving a stop means knowing that ≡ hides a menu, opening it, and choosing 收藏此車站 from a dark pop-up that covers the screen (centre); in our count this takes seven taps from Home. The saved stop then appears in 收藏 as a bare number with no live or scheduled label (right). Above the list, the route map is covered with mascot graphics, and when a route has no service the message is cut off without a reason (`t4-planner-N368-no-service-clipped.png`).

> **Figure 4.2a** Annotated originals: [figures/annotated/F2-save-annotated.png](figures/annotated/F2-save-annotated.png). Sources: `t2-stop-expanded-unlabelled-icons.png`, `t2-hidden-save-stop-menu.png`, `t2-favourites-after-save.png`, `t3-route-detail-map-mascots.png`. Callouts: ① four icons with no labels; ② save hidden behind ≡; ③ pop-up menu covers the content; ④ decorative text and "?" graphics compete with the stop list; ⑤ saved stop shows no Live/Scheduled label; ⑥ mascots cover stops on the map.

**(b) HCI principles.** *Violated:* recognition rather than recall (H6), as users must remember what each unlabelled icon does; Fitts' law (Fitts, 1954), because the save action sits behind small targets and several steps; aesthetic and minimalist design (H8); visibility of system status (H1) after saving. *Applied:* H6, Fitts' law, H3 user control (undo), H1 feedback, Norman's (2013) principle that an action needs a visible signifier.

**(c) Redesign** (Figure 4.2b).

- **A ☆ on every stop (F2).** Each row of the route has a 44 pt star at the right, so any stop can be saved without opening a menu.
- **A labelled save button.** The expanded stop shows its next two arrivals (5 min Live, 30 min Scheduled), three labelled tools (下車提示 Alight alert, 時間表 Timetable, 途經路線 Routes via this stop) and a full-width **收藏此站** (Save this stop) button.
- **Undo instead of a pop-up (F2A).** Saving fills the star, changes the button to **已收藏此站** (Stop saved) and shows a toast, 已收藏「海底隧道收費廣場」, with **復原** (Undo). Nothing blocks the screen.
- **Saved list (F1B, F1C).** Routes and stops are listed separately, each route with its live arrival. The empty state explains how to save and shows an example star to tap, with buttons to search routes or browse nearby stops. A management view lets users sort, remove items one by one (each with its own undo), and remove all, the only destructive action that asks for confirmation and can still be restored.
- **Route tools.** The timetable (F2B) is split by direction and by day type, shows first bus, last bus and frequency, and highlights the next departure. Service notices (F2C) explain a diversion with dates, the severe-weather arrangements and a new late-night trip, with a per-route notification toggle. The alight alert (M2 → F2D) lets the user choose the stop and the lead time (one to three stops), then shows a live countdown that works with the phone locked.

> **Figure 4.2b** Before/after. Left: originals from 4.2a. Right: F2 (45:2440) → F2A (45:2441) → F1B (45:2442); second row F2B (45:2443), F2C (45:2444), F2D (30:2202). Figma boards "03 · F2 One-tap save" and "04 · Route detail & service status".

**(d) Rationale.** Saving is what makes Home useful, so it has to be obvious and quick. A visible star on every stop and a labelled button replace recall with recognition (H6), and large targets reduce errors for one-handed use (Parhi et al., 2006). Undo is faster than a confirmation dialog and lets users act without fear of mistakes (H3; Shneiderman et al., 2016). The timetable, notices and alert answer the next questions a rider has once they know which bus to take. *Tested in Maze: blocks 6–8 (save a stop, check saved stops). Section 5 discusses why the entry to this screen from Home was harder to find than the save action itself.*

---

## 4.3 F3 Trip planning by place name

**(a) Problem in the existing app.** The main search box only accepts route numbers and opens a keypad that fills most of the screen (Figure 4.3a). In the point-to-point planner the origin field shows a raw "null" (現在位置) instead of the current location. Typing a stop name returns nine near-identical entries for 紅磡站, most told apart only by the codes in brackets. Results rank overnight routes (N368, N171, N122) among the fastest options, and only a small clock icon on N368 hints that it may not be running. The "智能建議" (Smart Suggestion) feature quietly changes the boarding stop (HH979 entered, HH602 suggested), and when nothing is found it either blames the destination or tells the user to phone the hotline. Route search through the bot1933 chat assistant turns a simple query into a multi-step conversation.

> **Figure 4.3a** Annotated originals: [figures/annotated/F3-trip-annotated.png](figures/annotated/F3-trip-annotated.png). Sources: `t3-search-route-number-only.png`, `t4-planner-null-origin.png`, `t4-planner-ambiguous-stops.png`, `t4-planner-night-routes-daytime.png`, `t4-planner-ai-changes-stops.png`, `t4-planner-error-call-hotline.png`. Not in the figure: `t4-planner-error-ai-blames-destination.png`, `t6-bot1933-route-flow.png` (Appendix E if needed). Callouts: ① route numbers only; ② keypad covers the list; ③ origin shows "null"; ④ nine look-alike results; ⑤ overnight routes ranked among the fastest; ⑥ Smart Suggestion changes the boarding stop without saying so; ⑦ dead end: "call the hotline".

**(b) HCI principles.** *Violated:* match between system and the real world (H2), since people think in places, not route numbers or stop codes; recognition rather than recall (H6); error prevention (H5), as a null origin is allowed; help users recognise, diagnose and recover from errors (H9); user control and freedom (H3), as the AI changes the query without consent. *Applied:* H2, H5, H6, H9, H3.

**(c) Redesign** (Figure 4.3b).

- **Origin preset (F3).** 起點 (From) starts as 目前位置 · 紅磡站附近 (current location), so a search can never run without an origin; a swap button reverses the trip.
- **Place-name suggestions.** Typing 旺角中心 suggests the shopping centre and nearby stops, each with its type and street or direction (彌敦道 · 往太子方向), so similar names are distinguishable. Recent searches are kept.
- **Clear results (F3A).** Three options, the first labelled **推薦** (Recommended) and **最快 · 直達** (Fastest · Direct). Each shows total time, arrival time, fare and the legs as chips (walk 2 min → 87D, 6 stops), plus the next departure with a Live or Scheduled label. The recommended option expands into step-by-step directions with the boarding and alighting stops marked.
- **Transparent correction with undo (F3C).** If the user types 朗豪方, the app searches for 朗豪坊 but says so at the top ("已改為搜尋「朗豪坊」… 你輸入的是「朗豪方」") with **改回原本輸入** (Use my spelling) and **正確** (Correct).
- **Errors that help (S1).** An invalid destination is outlined in red with the message 請輸入有效的目的地、車站或地標 directly below the field, plus 重新搜尋 (Search again) and 返回行程 (Back to trip).
- **Without location (S4).** The same place-name search is offered when location is off, with popular places listed.

> **Figure 4.3b** Before/after. Left: originals from 4.3a. Right: F3 (45:2445) → F3A (45:2446); F3C (45:2447) and S1 (45:2448). Figma boards "05 · F3 Trip planning" and "06 · F3 Errors & AI corrections".

**(d) Rationale.** Older passengers in our research know where they want to go but not which bus goes there, so search must start from places (H2, H6). Presetting the origin removes the most common error before it happens (H5). We kept a smart correction, because typos are common on small keyboards, but made it visible and reversible: the system may suggest, the user decides (H3). Every error screen gives a next step instead of a dead end (H9). *Tested in Maze: blocks 9–11 (Hung Hom Station → Argyle Centre).*

---

## 4.4 F4 Nearby stops and landmarks

**(a) Problem in the existing app.** Nearby search asks for a stop code on a letter keypad (Figure 4.4a, left), which no passenger knows. With location off, the screen shows a single line of text and no way forward (centre). On a real phone, the stop list is headed by a row of stop codes (HH979, HH500…), and the landmarks list shows only a walking distance next to each icon, with no name or category to identify the landmark (right, annotated by our Accessibility Lead).

> **Figure 4.4a** Annotated originals: [figures/annotated/F4-nearby-annotated.png](figures/annotated/F4-nearby-annotated.png). Sources: `t5-nearby-stop-code-entry.png`, `t5-nearby-landmarks-location-off.png`, `cropped/moling-nearby-landmarks.jpeg` (its own "No visible landmark identification" note kept). Callouts: ① stop code required; ② location off: one line of text and no button to turn location on; ③ stops identified by codes; ④ landmark rows show distance only.

**(b) HCI principles.** *Violated:* match between system and the real world (H2); recognition rather than recall (H6); help users recover (H9) when location is off. Rows without names also fail screen-reader users, as there is no text to read out (WCAG 1.1.1, 1.3.1; W3C, 2024). *Applied:* H2, H6, H9, and grouping each stop with its buses in one card (proximity and common region).

**(c) Redesign** (Figure 4.4b).

- **Stops as places (F4).** Each stop card is headed by walking time and distance (步行 2 分鐘 · 120m), then the stop name, street and direction (康莊道 · 過海巴士), then the next buses at that stop, each with destination, "最快到站" (arriving first) or "第二班" (next), minutes and a Live/Scheduled badge.
- **Expand in place (F4A).** Tapping a route shows journey time, fare and its stops without leaving the list.
- **Landmarks (F4B).** A second filter lists landmarks by name with category, walking time and distance (香港理工大學 · 大學 · 步行 5 分鐘 · 350 m), the nearest stop and the buses that stop there as tappable badges. A third filter, 公共設施 (Facilities), lists nearby facilities such as an accessible toilet.
- **Map view (F4C).** Numbered pins match the numbers in the list, and selecting a pin opens a sheet with the next buses and **查看車站** (View stop). The map is reachable from Nearby and from Home.
- **Location off (S4).** Explains the situation and offers two equal options: turn location on, or search by place name, with popular places.

> **Figure 4.4b** Before/after. Left: originals from 4.4a. Right: F4 (45:2449), F4B (45:2450), F4C (32:2344), S4 (45:2437). Figma board "07 · F4 Nearby stops & landmarks".

**(d) Rationale.** People find a stop by where it is and how far away it is, not by its code (H2). Showing the next buses on the stop card removes a step for commuters, and listing which buses serve a landmark answers older passengers' typical question ("which bus goes to the hospital?") directly. List and map show the same numbered stops, so users can choose the view that suits them without learning two systems (H4, H7). *Tested in Maze: blocks 12–17 (find nearby stops, use the map, find landmarks).*

---

## 4.5 F5 More menu and accessibility

**(a) Problem in the existing app.** The grid button opens 24 icons in no particular order, mixing membership, pet buses, online shopping, social media and service information (Figure 4.5a, left). The language menu is a dark pop-up with no cancel button (right). None of the 24 items changes text size, and long names are already cut off at the default size (Appendix D, check 9), so older passengers cannot enlarge arrival times in the app. [Confirm with the phone test in Appendix D before adding: "and it ignores the phone's own text size".] Our audit also found low-contrast labels (1.38:1 to 4.37:1) and icon buttons with no screen-reader label (Appendix D).

> **Figure 4.5a** Annotated originals: [figures/annotated/F5-more-annotated.png](figures/annotated/F5-more-annotated.png). Sources: `t6-menu-grid.png`, `t7-language-no-cancel.png`. Callouts: ① 24 unsorted icons; ② promotions and social media mixed with service tools; ③ no text-size or display setting in the menu; ④ language pop-up with no way to cancel.

**(b) HCI principles.** *Violated:* Hick's law (Hick, 1952), since decision time grows with the number of undifferentiated choices; aesthetic and minimalist design (H8); user control and freedom (H3) in the language pop-up; WCAG 1.4.4 Resize Text. *Applied:* Hick's law, H8, H3, H6, WCAG 1.4.4, 1.4.3 and 1.4.1.

**(c) Redesign** (Figure 4.5b).

- **Grouped settings (F5).** Three headed sections replace the grid: 文字顯示 (Text), 視覺輔助 (Visual aids) and 其他 (Other: offline trip PDF, notifications, language).
- **Text size.** A − / + control steps through 100%, 150% and 200%, shows the current value, and greys out the button at either limit (S2A, S2B). The whole app rescales (Section 3.7).
- **High contrast and calm mode.** Two labelled switches with one-line explanations: 加深文字及介面邊界 (darker text and clearer borders) and 減少動畫、廣告及非必要資訊 (fewer animations, ads and extras). Both apply across the app (S2C, S3).
- **Language sheet (M1).** A bottom sheet lists 繁體中文, 简体中文 and English as radio rows, each written in its own script with a short description, applies the choice at once and closes with ×. The same three options appear on the first screen (O1), and the 繁/EN button on Home opens the same sheet.

> **Figure 4.5b** Before/after. Left: originals from 4.5a. Right: F5 (45:2451), M1 (45:2452), S2B (358:2534), S2 (45:2453). Figma board "08 · F5 More & accessibility".

**(d) Rationale.** Grouping a handful of real settings under clear headings makes each one quick to find (Hick's law, H8). Larger, high-contrast text is a standing recommendation for older users (Zaphiris et al., 2005), and both Apple (n.d.) and WCAG 1.4.4 (W3C, 2024) ask for text that enlarges to 200%. Putting these settings at the top of More follows where both iOS and Android place display settings, so users who look for "settings" find them. Calm mode answers the anxiety about adverts that came up in our journey research. A language choice should never trap the user, so every sheet can be closed and every change takes effect immediately. *Tested in Maze: blocks 18–20 (adjust text size, then read Bus 116 at 200%).*

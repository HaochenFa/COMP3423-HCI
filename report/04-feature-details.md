# 4. Feature Details

> Draft, 8 Nov 2026, written from the frozen Figma file.
>
> - **Length:** target 4–6 pages, about one page per feature, each with an annotated "before" figure and a before/after figure. This draft is about 2,400 words. To fit, cut each feature to about 250 words and merge its two figures into one before/after figure.
> - **"Before" images** must be the real screenshots in `original-app-screenshots/`. Callouts are added on top; never edit the screenshot. The original app is in Chinese, so captions translate its labels.
> - **"After" images** come from the **en-GB page**, the version tested in Maze. The Traditional Chinese page has layout faults in its final save (squashed Home search bar, blank language button on S5–S7). For the same reason, do not export the boards on the Figma page "Original vs Redesign 原版對比": they hold instances of the Chinese screens. Compose each before/after figure from the annotated original and en-GB exports instead (team decision, 8 Nov).
> - Screen codes and node IDs refer to the en-GB page.
> - Each feature notes which Maze mission tested it; results are discussed in Section 5.

---

## 4.1 F1 Home: saved routes first, honest arrival times, no pop-up ads

**(a) Problem in the existing app.**
- **A full-screen advert on opening** (Figure 4.1a, left). The only way past it is a small skip button (▶|) in the top corner, about 6% of the screen width. The full-width 開啟 (Open) bar at the bottom belongs to the advert. Our other phone captures show a second full-screen advert, for a bank (centre).
- **Home itself is crowded** (right).
  - It leads with a rotating banner of quizzes and promotions.
  - A floating "想去哪里" button covers part of the list; v2.3.39 renames it 智能問路.
  - A second banner advert sits at the bottom.
- **Adverts on every tab:** our iPhone captures of v2.3.39 show a banner advert above the tab bar on every main tab: Home, 收藏, 搜尋, 鄰近 and 遊戲 (`*-iphone-*.png`).
- **Routes are listed by stop**, not by what the user saved.
- **Live and scheduled times look the same.** On Home and in 收藏, the arrival column shows bare numbers. Only the expanded stop in route detail adds 預定班次 (Scheduled) to scheduled times.
- **The bottom bar gives a whole tab to mini-games.**

> **Figure 4.1a** Annotated originals: [figures/annotated/F1-home-annotated.png](figures/annotated/F1-home-annotated.png).
>
> - Sources: `t1-launch-fullscreen-ad.png` (phone capture taken right after opening the app), `cropped/moling-ads-interstitial.jpeg` (three phone captures, app set to Simplified Chinese) and `t7-games-tab.png`.
> - Callouts: ① full-screen adverts, the first shown on opening with only a small skip button; ② rotating quiz and promotion banner; ③ floating button covering arrival times; ④ banner advert in the list; ⑤ arrival minutes with no Live/Scheduled label; ⑥ Games tab in the main navigation.

**(b) HCI principles.** *Violated:*
- user control and freedom (H3) and flexibility and efficiency of use (H7), since the user must wait for or dismiss an advert to reach the one piece of information they came for;
- visibility of system status (H1), because live and scheduled times cannot be told apart;
- aesthetic and minimalist design (H8).

Forced, interrupting adverts are a known cause of irritation and avoidance (Edwards et al., 2002). Making them hard to dismiss, here a small skip icon beside a full-width 開啟 bar, is a dark pattern (Gray et al., 2018). For older passengers in our journey research, a sudden full-screen advert also looked like a scam. *Applied:* H7, H1, H3, H8.

**(c) Redesign** (Figure 4.1b).

- **Saved routes first (F1).** Under the red header and search bar, the first section is **My favourites**: one card per saved route with the destination, boarding stop and the next bus in the largest type on the card (route 8: To Kowloon Station, 5 min).
- **Every time is labelled.** Each arrival carries a green **Live** or amber **Scheduled** badge, so the label, not only the colour, tells the user how far to trust it.
- **Status line.** "Near Hung Hom Station · Updated 10:32 · Auto-refresh" sits directly under the header.
- **Expand in place (F1A).** Tapping a route opens the card to show the full route time (27 min), fare ($5.8), number of stops and the stop list, with the link **See full route and save stops**. The user gets more detail without losing their place.
- **Nearby on Home.** Below the favourites, the nearest stop (Cross Harbour Tunnel, 2 min · 120 m) shows its next buses, with a **Map view** link.
- **One honest ad space.** A single card marked "Ad · Sponsored" at the end of Home, with a close button. Calm mode (F5) is described as hiding ads. No launch advert, no pop-ups, no Games tab.
- **States.**
  - S5 says "Getting the latest arrival times…" while showing a skeleton.
  - S6 says "You're offline", explains that the times shown are from 10:32 and may be out of date, labels each one **Offline** and offers **Retry**.
  - S7 shows "Black Rainstorm Warning in force". It marks route 8 **Suspended** and 87D **Diverted**, and links to **See affected routes**.

> **Figure 4.1b** Before/after. Left: original Home (from 4.1a). Right: F1 (20:601), F1A (20:844), S6 (28:2420), S7 (28:2646).

**(d) Rationale.**
- **One question first.** Our two groups both open the app to check one bus, often in a hurry, so the first screen should answer that question with no extra step (H7).
- **Live labels build trust.** Real-time information only reduces waiting stress when riders can trust it (Ferris et al., 2010; Watkins et al., 2011). The offline and disruption states keep that trust when the data is stale or the service is not running.
- **One predictable advert.** We kept one advert because the operator relies on advertising income, but made it predictable, labelled and closable instead of interruptive.

*Tested in Maze: blocks 2–3 (next Bus 8, route duration).*

---

## 4.2 F2 One-tap save and route detail

**(a) Problem in the existing app.**
- **Unlabelled icons.** In route detail, the selected stop shows a column of four unlabelled round icons (bell, clock, pin, ≡) next to decorative district trivia (Figure 4.2a, left).
- **Saving is hidden.** The user has to know that ≡ hides a menu, open it, and choose 收藏此車站 from a dark pop-up that covers the screen (centre). In our count this takes seven taps from Home.
- **No label after saving.** The saved stop then appears in 收藏 as a bare number with no live or scheduled label (right).
- **No help when empty.** With nothing saved, 收藏 shows only 沒有收藏任何車站 (no saved stops) and gives no hint of how to save one (`t2-saved-iphone-empty-no-hint.png`).
- **Clutter and cut-off messages.** Above the list, the route map is covered with mascot graphics. When a route has no service, the message is cut off without a reason (`t4-planner-N368-no-service-clipped.png`).

> **Figure 4.2a** Annotated originals: [figures/annotated/F2-save-annotated.png](figures/annotated/F2-save-annotated.png).
>
> - Sources: `t2-stop-expanded-unlabelled-icons.png`, `t2-hidden-save-stop-menu.png`, `t2-favourites-after-save.png`, `t3-route-detail-map-mascots.png`.
> - Callouts: ① four icons with no labels; ② save hidden behind ≡; ③ pop-up menu covers the content; ④ decorative text and "?" graphics compete with the stop list; ⑤ saved stop shows no Live/Scheduled label; ⑥ mascots cover stops on the map.

**(b) HCI principles.** *Violated:*
- recognition rather than recall (H6), as users must remember what each unlabelled icon does;
- Fitts' law (Fitts, 1954), because the save action sits behind small targets and several steps;
- aesthetic and minimalist design (H8);
- visibility of system status (H1) after saving.

*Applied:* H6, Fitts' law, H3 user control (undo), H1 feedback, and Norman's (2013) principle that an action needs a visible signifier.

**(c) Redesign** (Figure 4.2b).

- **A ☆ on every stop (F2).** Each stop row has a 44 pt star at the right, so any stop can be saved without opening a menu. A ☆ in the title bar saves the whole route.
- **Route tools at the top.** Under the fare and journey time (27 min · 6 stops) sit three labelled buttons: **Reverse**, **Timetable** and **Notices**.
- **A labelled save button.** The current stop (Cross Harbour Tunnel, "Near you") is expanded with:
  - its estimated arrivals: 5 min Live, 30 min Scheduled;
  - three labelled tools: Alight alert, Timetable, Routes here;
  - a full-width **Save this stop** button.
- **Undo instead of a pop-up (F2A).** Saving fills the star, changes the button to **Stop saved** and shows a toast, Saved "Cross Harbour Tunnel", with **Undo**. Nothing blocks the screen.
- **Saved list (F1B, F1C).**
  - **My routes** and **My stops** are listed separately, each route with its live arrival, and "Tap Edit to reorder or remove saved items".
  - The empty state ("Nothing saved yet") explains how to save: "Tap ☆ on any route or stop to save it. Saved routes appear first on Home." It shows an example card ("Tap here to save ↑") and buttons to **Search routes** or **Browse nearby stops**.
- **Timetable (F2B).** Split by direction and by day type (Mon–Fri, Saturday, Sun & holidays). It shows first bus, last bus and frequency (06:00, 00:15, every 7–15 min) and highlights the next departure.
- **Service notices (F2C).** They explain:
  - a diversion at Gascoigne Road, with dates;
  - the severe-weather arrangements;
  - a new late-night trip.

  A switch, "Notify me about new notices", applies to this route only.
- **Alight alert (M2 → F2D).**
  - "Remind me before my stop" lets the user choose the stop and the lead time (1, 2 or 3 stops), with vibrate, sound and lock-screen options.
  - The in-progress screen shows "2 stops to go" and the expected arrival time. It marks where the bus is, where the alert will fire and a stop it will skip ("Not stopping", matching the diversion notice).
  - It notes: "You can lock your phone – the alert will still appear."

> **Figure 4.2b** Before/after. Left: originals from 4.2a. Right: F2 (20:1146) → F2A (29:2181) → F1B (27:1490); second row F2B (29:2330), F2C (29:2513), F2D (30:2563).

**(d) Rationale.**
- **Saving must be obvious and quick**, because saving is what makes Home useful. A visible star on every stop and a labelled button replace recall with recognition (H6). Large targets reduce errors for one-handed use (Parhi et al., 2006).
- **Undo beats a confirmation dialog.** It is faster and lets users act without fear of mistakes (H3; Shneiderman et al., 2016).
- **The tools answer the next questions.** The timetable, notices and alert cover what a rider asks once they know which bus to take.

*Tested in Maze: blocks 6–8 (save a stop, check saved stops). Section 5 discusses why the entry to this screen from Home was harder to find than the save action itself.*

---

## 4.3 F3 Trip planning by place name

**(a) Problem in the existing app.**
- **Route numbers only.** The main search box only accepts route numbers and opens a keypad that fills most of the screen (Figure 4.3a).
- **A "null" origin.** In the point-to-point planner the origin field shows a raw "null" (現在位置) instead of the current location. It still does in v2.3.39, where the planner opens from the 智能問路 button.
- **Four steps to pick a place.** To start from a place rather than a stop, our tester on the iPhone had to:
  1. choose a region (九龍);
  2. choose a district (油尖旺);
  3. choose an area (尖沙咀東/紅磡站);
  4. find the spot on a map and press 確認.

  Only then can the trip be searched (Figure 4.3b).
- **Look-alike results.** Typing a stop name returns nine near-identical entries for 紅磡站, most told apart only by the codes in brackets.
- **Overnight routes ranked as fastest.** Results rank N368, N171 and N122 among the fastest options. Only a small clock icon on N368 hints that it may not be running.
- **The AI changes the query.** The "智能建議" (Smart Suggestion) feature quietly changes the boarding stop (HH979 entered, HH602 suggested).
- **Dead ends.** When nothing is found, the planner either blames the destination or tells the user to phone the hotline.
- **Slow chat search.** Route search through the bot1933 chat assistant turns a simple query into a multi-step conversation.

> **Figure 4.3a** Annotated originals: [figures/annotated/F3-trip-annotated.png](figures/annotated/F3-trip-annotated.png).
>
> - Sources: `t3-search-route-number-only.png`, `t4-planner-null-origin.png`, `t4-planner-ambiguous-stops.png`, `t4-planner-night-routes-daytime.png`, `t4-planner-ai-changes-stops.png`, `t4-planner-error-call-hotline.png`.
> - Not in the figure: `t4-planner-error-ai-blames-destination.png`, `t6-bot1933-route-flow.png` (Appendix E if needed).
> - Callouts: ① route numbers only; ② keypad covers the list; ③ origin shows "null"; ④ nine look-alike results; ⑤ overnight routes ranked among the fastest; ⑥ Smart Suggestion changes the boarding stop without saying so; ⑦ dead end: "call the hotline".

> **Figure 4.3b** Picking a place in the planner (iPhone, v2.3.39): [figures/annotated/F3b-pick-location-annotated.png](figures/annotated/F3b-pick-location-annotated.png).
>
> - Sources: `t4-planner-iphone-null-origin.png`, `t4-planner-iphone-pick-region.png`, `t4-planner-iphone-pick-district-area.png`, `t4-planner-iphone-pick-on-map.png`.
> - Callouts: ① origin starts as "null"; ② region; ③ district, then area; ④ find the spot on the map and press 確認.

**(b) HCI principles.** *Violated:*
- match between system and the real world (H2), since people think in places, not route numbers, stop codes or the planner's district list;
- recognition rather than recall (H6);
- flexibility and efficiency of use (H7), as one place takes four levels of menus and a map;
- error prevention (H5), as a null origin is allowed;
- help users recognise, diagnose and recover from errors (H9);
- user control and freedom (H3), as the AI changes the query without consent.

*Applied:* H2, H5, H6, H7, H9, H3.

**(c) Redesign** (Figure 4.3c).

- **Origin preset (F3).** **From** starts as "My location • Hung Hom", so a search can never run without an origin.
- **Place-name suggestions.** Typing "Argyle Centre" suggests the shopping centre and the stops around it, each with its type and street or direction ("Argyle Centre · 688 Nathan Rd · Shopping centre"; "Outside Argyle Centre · Nathan Rd · towards Prince Edward"). Similar names are therefore distinguishable.
- **Clear results (F3A).** "3 travel options".
  - The first is labelled **Recommended** and **Fastest · Direct**: 28 min, arriving 11:00, fare $6.4, with the legs as chips (Walk 2 min → 87D, 6 stops) and the next bus (in 10 min, Live).
  - It expands into step-by-step directions: walk 2 min to the Cross Harbour Tunnel stop, take 87D, with the stops listed and "Get on" and "Get off" marked.
  - The other two options (one transfer; a slower direct route) follow below. In the prototype they sit below the visible area, because the screens do not scroll.
- **Transparent correction with undo (F3C).** If the user types "Langham Plce", the app searches for Langham Place but says so at the top ("You typed 'Langham Plce'. We think you meant 'Langham Place'."). It offers **Use my spelling** and **Correct**.
- **Errors that help (S1).** An empty or invalid destination is flagged directly below the field ("Enter a valid destination, stop or place"). The screen explains "No routes found · Check the place name, or try a nearby street." and offers **Search again**.
- **Without location (S4).** The same place-name search is offered when location is off, with popular places listed.

> **Figure 4.3c** Before/after. Left: originals from 4.3a. Right: F3 (20:1362) → F3A (1:1126); F3C (31:2759) and S1 (20:2479).

**(d) Rationale.**
- **Start from places.** Older passengers in our research know where they want to go but not which bus goes there, so search must start from places (H2, H6).
- **Prevent the commonest error.** Presetting the origin removes it before it happens (H5).
- **Visible, reversible correction.** We kept a smart correction, because typos are common on small keyboards, but made it visible and reversible: the system may suggest, the user decides (H3).
- **No dead ends.** Every error screen gives a next step (H9).

*Tested in Maze: blocks 9–11 (Hung Hom Station → Argyle Centre).*

---

## 4.4 F4 Nearby stops and landmarks

**(a) Problem in the existing app.**
- **Stop codes.** Nearby search asks for a stop code on a letter keypad (Figure 4.4a, left), which no passenger knows.
- **A dead end with location off.** The screen shows a single line of text and no way forward (centre).
- **Codes and distances, no names.** On a real phone, the stop list is headed by a row of stop codes (HH979, HH500…). The landmarks list shows only a walking distance next to each icon, with no name or category to identify the landmark (right, annotated by our Accessibility Lead).

> **Figure 4.4a** Annotated originals: [figures/annotated/F4-nearby-annotated.png](figures/annotated/F4-nearby-annotated.png).
>
> - Sources: `t5-nearby-stop-code-entry.png`, `t5-nearby-landmarks-location-off.png`, `cropped/moling-nearby-landmarks.jpeg` (its own "No visible landmark identification" note kept).
> - Callouts: ① stop code required; ② location off: one line of text and no button to turn location on; ③ stops identified by codes; ④ landmark rows show distance only.

**(b) HCI principles.** *Violated:*
- match between system and the real world (H2);
- recognition rather than recall (H6);
- help users recover (H9) when location is off.

Rows without names also fail screen-reader users, as there is no text to read out (WCAG 1.1.1, 1.3.1; W3C, 2024). *Applied:* H2, H6, H9, and grouping each stop with its buses in one card (proximity and common region).

**(c) Redesign** (Figure 4.4b).

- **Stops as places (F4).** Each stop card is headed by walking time and distance (2 min walk · 120m). Then come the stop name and street (Cross Harbour Tunnel · Hong Chong Rd · cross-harbour buses), then the next buses at that stop. Each bus shows its destination, "Arriving first" or "Arriving next", the minutes and a Live or Scheduled badge.
- **Expand in place (F4A).** Tapping a route shows its journey time, fare and stops without leaving the list.
- **Landmarks (F4B).** A second filter lists landmarks by name, each with:
  - category, walking time and distance ("The Hong Kong Polytechnic University · University · 5 min walk · 350 m");
  - the nearest stop;
  - the buses that stop there, as route badges (route 8's opens its route detail in the prototype).
- **Map view (F4C).** Numbered pins match the numbers in the list. A card for the selected stop shows its next buses and **View stop**. The map is reachable from Nearby (**Map**) and from Home (**Map view**). It is labelled "Map for illustration only".
- **Location off (S4).** Explains the situation and offers two equal options, **Turn on location** or **Search by place name**, with popular places.

> **Figure 4.4b** Before/after. Left: originals from 4.4a. Right: F4 (20:1534), F4B (31:3008), F4C (32:2497), S4 (26:1525).

**(d) Rationale.**
- **Place and distance, not codes.** People find a stop by where it is and how far away it is, not by its code (H2).
- **Fewer steps for both groups.** Showing the next buses on the stop card removes a step for commuters. Listing which buses serve a landmark answers older passengers' typical question ("which bus goes to the hospital?") directly.
- **One system, two views.** List and map show the same numbered stops, so users can choose the view that suits them without learning two systems (H4, H7).

*Tested in Maze: blocks 12–17 (find nearby stops, use the map, find landmarks).*

---

## 4.5 F5 More menu and accessibility

**(a) Problem in the existing app.**
- **26 unsorted icons.** The grid button opens 26 icons in no particular order, mixing membership, pet buses, online shopping, social media and service information (Figure 4.5a, left).
- **A language menu with no cancel.** It is a dark pop-up with no cancel button (right).
- **No way to enlarge text.**
  - None of the 26 items changes text size.
  - The app ignores the phone's own text size: with iOS Larger Text at its maximum, every word on Home stays exactly the same size (Appendix D, check 9 and Figure D.2).
  - Older passengers therefore cannot enlarge arrival times at all.
- **Other audit findings:** low-contrast labels (1.4:1 to 4.4:1, confirmed on an iPhone) and icon buttons with no screen-reader label (Appendix D).

> **Figure 4.5a** Annotated originals: [figures/annotated/F5-more-annotated.png](figures/annotated/F5-more-annotated.png).
>
> - Sources: `t6-menu-grid-iphone-26-items.png` (iPhone, v2.3.39), `t7-language-no-cancel.png`.
> - Callouts: ① 26 unsorted icons; ② promotions and social media mixed with service tools; ③ no text-size or display setting in the menu; ④ language pop-up with no way to cancel.

**(b) HCI principles.** *Violated:*
- Hick's law (Hick, 1952), since decision time grows with the number of undifferentiated choices;
- aesthetic and minimalist design (H8);
- user control and freedom (H3) in the language pop-up;
- WCAG 1.4.4 Resize Text.

*Applied:* Hick's law, H8, H3, H6, WCAG 1.4.4, 1.4.3 and 1.4.1.

**(c) Redesign** (Figure 4.5b).

- **Grouped settings (F5).** Three headed sections replace the grid: **Text**, **Visual aids**, and **Other** (Download trip PDF, Notifications, Language).
- **Text size.**
  - An A− / A+ control ("Scale text up to 200%") steps through 100%, 150% and 200%. It shows the current value and dims the button at either limit (S2A, S2B).
  - Returning to Home after 200% shows the larger text: headings double and arrival text grows by about half (Section 3.7).
- **High contrast and calm mode.** Two labelled switches with one-line explanations, "Darker text and clearer borders" and "Fewer animations, ads and extras" (S2C, S3). S2 shows high contrast with 200% text.
- **Language sheet (M1).** A bottom sheet titled "Language・語言" lists 繁體中文, 简体中文 and English as radio rows. Each is written in its own script with a short description. The sheet says the choice "applies straight away" and closes with ×. The same three options appear on the first screen (O1), and the **EN** button on Home opens the same sheet.

> **Figure 4.5b** Before/after. Left: originals from 4.5a. Right: F5 (20:2116), M1 (20:2281), S2B (358:3071), S2 (20:2596), and Home at 200% (582:3847).

**(d) Rationale.**
- **Fewer, clearer choices.** Grouping a handful of real settings under clear headings makes each one quick to find (Hick's law, H8).
- **Larger text for older users.** Larger, high-contrast text is a standing recommendation for older users (Zaphiris et al., 2005). WCAG 1.4.4 (W3C, 2024) asks that text can be enlarged to 200% without losing content. Our largest step doubles headings and enlarges arrival text by about half, and a built app would also follow the phone's own text size.
- **Settings where people look.** Putting these settings at the top of More follows where both iOS and Android place display settings, so users who look for "settings" find them.
- **Calm mode** answers the anxiety about adverts that came up in our journey research.
- **No traps.** A language choice should never trap the user, so every sheet can be closed and every change takes effect immediately.

*Tested in Maze: blocks 18–20 (adjust text size, then read Bus 116 at 200%).*

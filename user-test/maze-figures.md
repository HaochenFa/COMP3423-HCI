# Maze report extraction: Kowloon_bus_app_Maze_user_testings

Source: `maze_official_report.pdf` in this folder (50 A4-landscape pages; each page is one 2246×1588 JPEG screenshot at 192 ppi with no text layer).
Method: transcribed on 8 Nov 2026. Every page was rendered and read, and all mission and per-screen numbers were checked a second time on 150 dpi crops. Page numbers (`p.N`) are PDF page numbers. Before a number goes into the report or slides, check it against the cited page.

Conventions in this file:
- Values are copied exactly as printed. "not shown" means the value is not on any page of the PDF.
- Anything marked **[derived]** is a calculation or chart reading, not a printed figure. Cite it as your own calculation, not as a Maze figure.
- Text in quotes is verbatim, including typos (marked [sic]).

---

## 1. Study level

| Item | Value | Source |
|---|---|---|
| Maze version (label) | "Maze version - Kowloon_bus_redesign" | p.1 |
| Maze / study name | "Kowloon_bus_app_Maze_user_testings" | p.1 |
| Responses | **9** | p.1 |
| # of blocks | **21** | p.1 |
| Overall usability score | **71** (out of 100, shown in a ring) | p.1 |
| Usability sub-scores | not shown | none |
| Test dates / date range | not shown | none |
| Download date | "Downloaded on the 11.8.2026" (format ambiguous; the PDF's metadata creation date is 8 Nov 2026, so it most likely means 8 November 2026) | p.1 |
| Device / platform / OS / browser | not shown | none |
| Testers' demographics | not shown | none |
| Study-level completion / drop-off totals | not shown. Every block reports 9 responses. | p.2–50 |
| Language note | "(You can only use English for the app testing.)" appears in block 1. Every screen name ends "— en-GB". | p.2, p.4–47 |

**[derived]** The mean of the nine mission usability scores (91, 84, 43, 83, 68, 44, 78, 76, 71) is 638 / 9 = 70.9, which rounds to the printed overall score of 71.

Block structure (block numbers are not printed; they are inferred from page order and the total matches "# of blocks 21"):
- 9 × "Prototype Test" (missions)
- 12 × "Multiple Choice": 6 comprehension checks, 5 ease ratings and 1 overall-impression question
- No Welcome, Thank-you, Opinion Scale, Open Question, Yes/No or Context Screen blocks appear. **There are no open-text answers in this report.**

---

## 2. Mission summary (all 9 Prototype Test blocks)

"Expected path" is the percentage on each mission's "Success Metrics" page: participants who completed the mission via the expected path, i.e. direct success.

| Block | Mission title | Score | Success rate | Expected path (direct) | Drop-off | Misclick rate | Avg. duration | Responses | Pages |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Let's get started! | 91 | 100.0% | 100% | 0.0% | 73.5% | 33.1s | 9 | p.2–6 |
| 3 | Take a ride on Bus No.8 | 84 | 100.0% | 100% | 0.0% | 25.0% | 16.5s | 9 | p.8–10 |
| 6 | Save Cross Harbour Tunnel Station | **43** | 88.9% | **22.2%** | 11.1% | 54.5% | 38.3s | 9 | p.13–17 |
| 7 | Have a check of your saved stations | 83 | 88.9% | 77.8% | 11.1% | 61.7% | 6.3s | 9 | p.18–20 |
| 9 | From Hung Hom Station to Argyle Centre | 68 | 100.0% | 88.9% | 0.0% | 55.8% | 31.3s | 9 | p.22–25 |
| 12 | Find bus stations nearby | **44** | 100.0% | **44.4%** | 0.0% | 38.7% | 31.2s | 9 | p.28–31 |
| 14 | Use a map and take a look around | 78 | 100.0% | 66.7% | 0.0% | 15.4% | 17.2s | 9 | p.33–36 |
| 15 | Find landmarks around me | 76 | 88.9% | 88.9% | 11.1% | 60.6% | 10.6s | 9 | p.37–39 |
| 18 | Adjust the size of texts | 71 | 100.0% | 66.7% | 0.0% | 37.3% | 31.6s | 9 | p.42–47 |

Indirect success, give-up and bounce rates are **not shown** as separate figures. The report prints only Success rate, Drop-off and Misclick rate. The mission overviews have no heatmaps and no click maps.

**[derived]** With n = 9: 88.9% = 8/9, 77.8% = 7/9, 66.7% = 6/9, 44.4% = 4/9, 22.2% = 2/9 and 11.1% = 1/9.
**[derived]** Indirect success = success rate − expected-path rate:

| Block | Mission | Indirect success [derived] |
|---|---|---|
| 1 | Let's get started! | 0% |
| 3 | Take a ride on Bus No.8 | 0% |
| 6 | Save Cross Harbour Tunnel Station | 66.7% (6/9) |
| 7 | Have a check of your saved stations | 11.1% (1/9) |
| 9 | From Hung Hom Station to Argyle Centre | 11.1% (1/9) |
| 12 | Find bus stations nearby | 55.6% (5/9) |
| 14 | Use a map and take a look around | 33.3% (3/9) |
| 15 | Find landmarks around me | 0% |
| 18 | Adjust the size of texts | 33.3% (3/9) |

How to read the funnel charts: the red "Participants dropped-off" area on the Success Metrics charts counts everyone who left the expected path, not only people who gave up. For example, block 6 shows 11.1% Drop-off in its overview but only 22.2% still on the expected path at the end of its chart.

---

## 3. Block by block

### Block 1: "Let's get started!" (Prototype Test), p.2–6
- Instructions (verbatim): "Please tap the start button to have a try on the app." / "Remember to turn on the location info while using the app!" / "(You can only use English for the app testing.)" (p.2)
- Mission usability score **91**; Avg. duration **33.1s**; Responses **9** (p.2)
- Success rate **100.0%**; Drop-off **0.0%**; Misclick rate **73.5%** (p.2)
- Success Metrics: **100%**. "It's time to celebrate...100% of participants completed this mission via the expected paths. Congrats!" The chart has x-axis ticks 01–04 and stays at 100% in flow throughout (p.3).
- Full path analysis:

| Screen | Name (as printed) | Avg. time on screen | Participants misclick rate | Screen score | Page |
|---|---|---|---|---|---|
| 1 | O1 · Onboarding / Welcome — en-GB | 20.3s | 56.0% | 65 | p.4 |
| 2 | O2 · Onboarding / Location permission — en-GB | 11.0s | 0.0% | 98 | p.5 |
| 3 | S5 · Loading / Home skeleton — en-GB | 1.8s | 0.0% | 100 | p.6 |

### Block 2: "When will the next Bus No.8 arrive?" (Multiple Choice), p.7
- Description: "You want to take Bus No.8. Please find out when the next Bus No.8 will arrive."
- Responses: 9

| Option (displayed order) | % | Count |
|---|---|---|
| After 5 min | 100% | 9 |
| After 12 min | 0% | 0 |
| After 3 min | 0% | 0 |
| After 9 min | 0% | 0 |
| I didn't find the answer | 0% | 0 |

The report does not mark a correct answer. The Home screenshot on p.10 shows route 8 "Next bus 5 min Live".

### Block 3: "Take a ride on Bus No.8" (Prototype Test), p.8–10
- Instructions: "Now you're already on Bus No.8, and you wonder how long it will take from the first station to terminal. Please find out the right answer." (p.8)
- Score **84**; Avg. duration **16.5s**; Responses **9** (p.8)
- Success rate **100.0%**; Drop-off **0.0%**; Misclick rate **25.0%** (p.8)
- Success Metrics: **100%**. "It's time to celebrate...100% of participants completed this mission via the expected path. Congrats!" The chart has ticks 01–02 and stays at 100% (p.9).
- Full path analysis:

| Screen | Name | Avg. time | Misclick | Score | Page |
|---|---|---|---|---|---|
| 1 | F1 · Home / Default — en-GB | 16.5s | 22.0% | 84 | p.10 |

### Block 4: "How long does it take from the first station to terminal?" (Multiple Choice), p.11
- Description: "Select the number you just read from the No.8 bus info."
- Responses: 9

| Option | % | Count |
|---|---|---|
| 27 min | 78% | 7 |
| 5 min | 22% | 2 |
| 12 min | 0% | 0 |
| 19 min | 0% | 0 |
| I didn't find the answer | 0% | 0 |

The report does not mark a correct answer. The F1A screenshot on p.16 shows the route 8 card with "Full route 27 min", "Fare $5.8" and "Stops 6 stops", directly below "Next bus 5 min Live".

### Block 5: "Is it easy for you to read infos of buses?" (Multiple Choice), p.12
- Description: "The question does not have any right answers. Follow your heart."
- Responses: 9

| Option | % | Count |
|---|---|---|
| Really Easy | 44% | 4 |
| Easy | 44% | 4 |
| Moderate | 11% | 1 |
| A Little Difficult | 0% | 0 |
| Really Difficult | 0% | 0 |

### Block 6: "Save Cross Harbour Tunnel Station" (Prototype Test), p.13–17
- Instructions: "You often travelled to Cross Harbour Tunnel Station before. Now you're again at the station, and you decide to save the station as you may use the infos frequently. Please save the station in Bus No.8 infos." (p.13)
- Score **43**; Avg. duration **38.3s**; Responses **9** (p.13)
- Success rate **88.9%**; Drop-off **11.1%**; Misclick rate **54.5%** (p.13)
- Success Metrics: **22.2%**. "Uh oh! An unusually low % of participants completed your task via the expected path. Help bring back lost participants by consulting the metrics below." The chart has ticks 01–04 (p.14).
  - Exact counts from the online report (§8): 9 at 01 (Home), **5** at 02 (F1A; "44.44% … 4 participants got lost" at Home), **2** at 03 and 04 ("60% … 3 participants got lost" at F1A).
- Full path analysis:

| Screen | Name | Avg. time | Misclick | Score | Page |
|---|---|---|---|---|---|
| 1 | F1 · Home / Default — en-GB | 10.4s | 22.0% | 43 | p.15 |
| 2 | F1A · Home / Favourite route expanded — en-GB | 4.3s | 0.0% | 40 | p.16 |
| 3 | F2 · Route Detail / Stop expanded — en-GB | 4.9s | 50.0% | 75 | p.17 |

### Block 7: "Have a check of your saved stations" (Prototype Test), p.18–20
- Instructions: "Please check the station you just saved (there are already some default saved buses and stations just for app testings.)" (p.18)
- Score **83**; Avg. duration **6.3s**; Responses **9** (p.18)
- Success rate **88.9%**; Drop-off **11.1%**; Misclick rate **61.7%** (p.18)
- Success Metrics: **77.8%**. "Uh oh! A significantly low % of participants completed your task via the expected path. Help bring them back by analyzing off-path, exit, and misclick rates to improve your future flow." The chart has ticks 01–02 (p.19).
- Full path analysis:

| Screen | Name | Avg. time | Misclick | Score | Page |
|---|---|---|---|---|---|
| 1 | F1 · Home / Default — en-GB | 5.6s | 0.0% | 78 | p.20 |

Note: this screen shows a 0.0% misclick rate, yet the mission misclick rate is 61.7%. The report does not show which screens produced those misclicks.

### Block 8: "Is it easy for you to save a station?" (Multiple Choice), p.21
- Description: "The question does not have any right answers. Follow your heart."
- Responses: 9

| Option | % | Count |
|---|---|---|
| Really Easy | 33% | 3 |
| Easy | 22% | 2 |
| Moderate | 22% | 2 |
| A Little Difficult | 22% | 2 |
| Really Difficult | 0% | 0 |

This is the only question in the report with any "difficult" responses.

### Block 9: "From Hung Hom Station to Argyle Centre" (Prototype Test), p.22–25
- Instructions: "You are right now at Hung Hom Station, and you have no idea how to get to Argyle Centre." / "Please search the recommended route from Hung Hom Station to Argyle Centre." (p.22)
- Score **68**; Avg. duration **31.3s**; Responses **9** (p.22)
- Success rate **100.0%**; Drop-off **0.0%**; Misclick rate **55.8%** (p.22)
- Success Metrics: **88.9%**. "Looking good! The majority of participants completed your mission via the expected path." The chart has ticks 01–03. **[derived]** In-flow reaches about 89% by 02 and stays flat to 03 (p.23).
- Full path analysis (the screen images on these pages are blank in the export):

| Screen | Name | Avg. time | Misclick | Score | Page |
|---|---|---|---|---|---|
| 1 | F1 · Home / Default — en-GB | 13.4s | 33.0% | 69 | p.24 |
| 2 | F3 · Trip Planner / Destination autocomplete — en-GB | 17.0s | 50.0% | 70 | p.25 |

### Block 10: "What's the recommended bus number and how long will you walk to get to the destination?" (Multiple Choice), p.26
- Description: "Please read the infos given in the searching results to plan for the trip."
- Responses: 9

| Option | % | Count |
|---|---|---|
| 87D, 28 min | 67% | 6 |
| 87D, 2 min | 33% | 3 |
| 87D, 6 min | 0% | 0 |
| 87D, 6.4 min | 0% | 0 |
| I didn't find the answer | 0% | 0 |

The report does not mark a correct answer, and the trip-result screen is not shown in this export.

### Block 11: "Is it easy for you to search a route?" (Multiple Choice), p.27
- Description: "The question does not have any right answers. Follow your heart."
- Responses: 9

| Option | % | Count |
|---|---|---|
| Easy | 56% | 5 |
| Really Easy | 44% | 4 |
| Moderate | 0% | 0 |
| A Little Difficult | 0% | 0 |
| Really Difficult | 0% | 0 |

### Block 12: "Find bus stations nearby" (Prototype Test), p.28–31
- Instructions: "You are right now close to Hung Hom Station, and you want to catch the bus at a station close to you." / "Please find out the nearest bus and see the details of the bus using "Nearby" function." (p.28)
- Score **44**; Avg. duration **31.2s**; Responses **9** (p.28)
- Success rate **100.0%**; Drop-off **0.0%**; Misclick rate **38.7%** (p.28)
- Success Metrics: **44.4%**. "Uh oh! An unusually low % of participants completed your task via the expected path. Help bring back lost participants by consulting the metrics below." The chart has ticks 01–03 (p.29).
  - **[derived, chart reading]** In-flow is about 100% at 01, about 66% at 02 (≈6/9) and 44.4% at 03.
- Full path analysis (screen images blank in the export):

| Screen | Name | Avg. time | Misclick | Score | Page |
|---|---|---|---|---|---|
| 1 | F1 · Home / Default — en-GB | 19.9s | 22.0% | 49 | p.30 |
| 2 | F4 · Nearby Stops / List — en-GB | 15.0s | **67.0%** | **29** (lowest screen score in the report) | p.31 |

### Block 13: "Which bus arrives first?" (Multiple Choice), p.32
- Description: "According to the detailed infos you read, find out which bus comes first at the station neareast [sic] to you."
- Responses: 9

| Option | % | Count |
|---|---|---|
| Bus No.101 | 89% | 8 |
| Bus No.8 | 11% | 1 |
| Bus No.11K | 0% | 0 |
| Bus No.116 | 0% | 0 |
| I didn't find the answer | 0% | 0 |

The report does not mark a correct answer.

### Block 14: "Use a map and take a look around" (Prototype Test), p.33–36
- Instructions: "In "Nearby", please turn on the map and see your location." (p.33)
- Score **78**; Avg. duration **17.2s**; Responses **9** (p.33)
- Success rate **100.0%**; Drop-off **0.0%**; Misclick rate **15.4%** (p.33)
- Success Metrics: **66.7%**. "Uh oh! A significantly low % of participants completed your task via the expected path. Help bring them back by analyzing off-path, exit, and misclick rates to improve your future flow." The chart has ticks 01–03. **[derived]** In-flow falls to about 67% at 02 and stays flat to 03 (p.34).
- Full path analysis (screen images blank in the export):

| Screen | Name | Avg. time | Misclick | Score | Page |
|---|---|---|---|---|---|
| 1 | F1 · Home / Default — en-GB | 12.8s | 11.0% | 59 | p.35 |
| 2 | F4 · Nearby Stops / List — en-GB | 4.7s | 0.0% | 100 | p.36 |

### Block 15: "Find landmarks around me" (Prototype Test), p.37–39
- Instructions: "Find out the landmarks around you using "Nearby" function." (p.37)
- Score **76**; Avg. duration **10.6s**; Responses **9** (p.37)
- Success rate **88.9%**; Drop-off **11.1%**; Misclick rate **60.6%** (p.37)
- Success Metrics: **88.9%**. "Looking good! The majority of participants completed your mission via the expected path." The chart has ticks 01–02 (p.38).
- Full path analysis (screen image blank in the export):

| Screen | Name | Avg. time | Misclick | Score | Page |
|---|---|---|---|---|---|
| 1 | F4 · Nearby Stops / List — en-GB | 9.6s | 22.0% | 76 | p.39 |

### Block 16: "Which bus can take you to Queen Elizabeth Hospital?" (Multiple Choice, more than one answer allowed), p.40
- Description: "Find out the bus number(s) that can take you to Queen Elizabeth Hospital. This question may have one or more right answers."
- Responses: 9

| Option | % | Count |
|---|---|---|
| No. 11K | 100% | 9 |
| No. 116 | 100% | 9 |
| No. 8 | 0% | 0 |
| No. 5C | 0% | 0 |
| No. 87D | 0% | 0 |
| I didn't find the answer | 0% | 0 |

All 9 respondents selected both 11K and 116. The report does not mark a correct answer.

### Block 17: "Is it easy for you to use "Nearby" function?" (Multiple Choice), p.41
- Description: "The question does not have any right answers. Follow your heart."
- Responses: 9

| Option | % | Count |
|---|---|---|
| Easy | 44% | 4 |
| Really Easy | 33% | 3 |
| Moderate | 22% | 2 |
| A Little Difficult | 0% | 0 |
| Really Difficult | 0% | 0 |

### Block 18: "Adjust the size of texts" (Prototype Test), p.42–47
- Instructions: "The text on the home screen is too small for you to read comfortably. Make it the largest (200%), then return to the home screen and check when the next Bus No.116 arrives." (p.42)
- Score **71**; Avg. duration **31.6s**; Responses **9** (p.42)
- Success rate **100.0%**; Drop-off **0.0%**; Misclick rate **37.3%** (p.42)
- Success Metrics: **66.7%**. "Uh oh! A significantly low % of participants completed your task via the expected path. Help bring them back by analyzing off-path, exit, and misclick rates to improve your future flow." The chart has ticks 01–05 (p.43).
  - **[derived, chart reading]** In-flow is about 100% at 01, about 77% at 02 (≈7/9), and about 67% at 03, 04 and 05.
- Full path analysis (screen images blank in the export):

| Screen | Name | Avg. time | Misclick | Score | Page |
|---|---|---|---|---|---|
| 1 | F1 · Home / Default — en-GB | 22.1s | 33.0% | 54 | p.44 |
| 2 | F5 · More / Accessibility settings — en-GB | 2.7s | 0.0% | 86 | p.45 |
| 3 | S2A · Text Size / 150% — en-GB | 0.5s | 0.0% | 100 | p.46 |
| 4 | S2B · Text Size / 200% — en-GB | 4.3s | 50.0% | 75 | p.47 |

### Block 19: "When will the next Bus No.116 arrive?" (Multiple Choice), p.48
- Description: "Read the infos in the Homepage with larger text size."
- Responses: 9

| Option | % | Count |
|---|---|---|
| After 9 min | 100% | 9 |
| After 12 min | 0% | 0 |
| After 5 min | 0% | 0 |
| After 3 min | 0% | 0 |
| I didn't find the answer | 0% | 0 |

### Block 20: "Is it easy for you to adjust size of texts?" (Multiple Choice), p.49
- Description: "The question does not have any right answers. Follow your heart."
- Responses: 9

| Option | % | Count |
|---|---|---|
| Really Easy | 56% | 5 |
| Easy | 22% | 2 |
| Moderate | 22% | 2 |
| A Little Difficult | 0% | 0 |
| Really Difficult | 0% | 0 |

### Block 21: "Overall, how do you feel about the new version of Kowloon Bus?" (Multiple Choice), p.50
- Description: "This is the last question of the test. The majority of the app's functions are included in the tests. The question does not have any right answers. Follow your heart."
- Responses: 9

| Option | % | Count |
|---|---|---|
| Good | 89% | 8 |
| Very Good | 11% | 1 |
| Moderate | 0% | 0 |
| Bad | 0% | 0 |
| Really Bad | 0% | 0 |

Option order follows the report, which appears to sort options by count. For example, "Easy" is listed above "Really Easy" on p.27 and p.41, and "Good" above "Very Good" on p.50. Printed percentages are rounded, so some questions sum to 99% (p.12, p.21, p.41).

---

## 4. Ease and satisfaction summary

| Question (block) | Really Easy | Easy | Moderate | A Little Difficult | Really Difficult | Page |
|---|---|---|---|---|---|---|
| Read bus info (5) | 4 (44%) | 4 (44%) | 1 (11%) | 0 | 0 | p.12 |
| Save a station (8) | 3 (33%) | 2 (22%) | 2 (22%) | 2 (22%) | 0 | p.21 |
| Search a route (11) | 4 (44%) | 5 (56%) | 0 | 0 | 0 | p.27 |
| Use "Nearby" (17) | 3 (33%) | 4 (44%) | 2 (22%) | 0 | 0 | p.41 |
| Adjust text size (20) | 5 (56%) | 2 (22%) | 2 (22%) | 0 | 0 | p.49 |

Overall impression (block 21, p.50): Very Good 1 (11%), Good 8 (89%), Moderate 0, Bad 0, Really Bad 0.

**[derived]** Mean ease score, coding Really Easy = 5 down to Really Difficult = 1, with the share answering Easy or Really Easy:

| Question | Mean | Easy or Really Easy |
|---|---|---|
| Read bus info | 4.33 | 8/9 |
| Save a station | 3.67 | 5/9 |
| Search a route | 4.44 | 9/9 |
| Use "Nearby" | 4.11 | 7/9 |
| Adjust text size | 4.33 | 7/9 |
| Overall impression (Very Good = 5, Good = 4) | 4.11 | 9/9 answered Good or Very Good |

---

## 5. Per-screen details (all screens with data)

| Mission (block) | Screen | Avg. time | Misclick | Score | Screenshot in PDF? | Page |
|---|---|---|---|---|---|---|
| Let's get started! (1) | O1 · Onboarding / Welcome | 20.3s | 56.0% | 65 | yes | p.4 |
| Let's get started! (1) | O2 · Onboarding / Location permission | 11.0s | 0.0% | 98 | yes | p.5 |
| Let's get started! (1) | S5 · Loading / Home skeleton | 1.8s | 0.0% | 100 | yes | p.6 |
| Take a ride on Bus No.8 (3) | F1 · Home / Default | 16.5s | 22.0% | 84 | yes | p.10 |
| Save Cross Harbour Tunnel Station (6) | F1 · Home / Default | 10.4s | 22.0% | 43 | yes | p.15 |
| Save Cross Harbour Tunnel Station (6) | F1A · Home / Favourite route expanded | 4.3s | 0.0% | 40 | yes | p.16 |
| Save Cross Harbour Tunnel Station (6) | F2 · Route Detail / Stop expanded | 4.9s | 50.0% | 75 | yes | p.17 |
| Have a check of your saved stations (7) | F1 · Home / Default | 5.6s | 0.0% | 78 | yes | p.20 |
| Hung Hom → Argyle Centre (9) | F1 · Home / Default | 13.4s | 33.0% | 69 | blank | p.24 |
| Hung Hom → Argyle Centre (9) | F3 · Trip Planner / Destination autocomplete | 17.0s | 50.0% | 70 | blank | p.25 |
| Find bus stations nearby (12) | F1 · Home / Default | 19.9s | 22.0% | 49 | blank | p.30 |
| Find bus stations nearby (12) | F4 · Nearby Stops / List | 15.0s | 67.0% | 29 | blank | p.31 |
| Use a map and take a look around (14) | F1 · Home / Default | 12.8s | 11.0% | 59 | blank | p.35 |
| Use a map and take a look around (14) | F4 · Nearby Stops / List | 4.7s | 0.0% | 100 | blank | p.36 |
| Find landmarks around me (15) | F4 · Nearby Stops / List | 9.6s | 22.0% | 76 | blank | p.39 |
| Adjust the size of texts (18) | F1 · Home / Default | 22.1s | 33.0% | 54 | blank | p.44 |
| Adjust the size of texts (18) | F5 · More / Accessibility settings | 2.7s | 0.0% | 86 | blank | p.45 |
| Adjust the size of texts (18) | S2A · Text Size / 150% | 0.5s | 0.0% | 100 | blank | p.46 |
| Adjust the size of texts (18) | S2B · Text Size / 200% | 4.3s | 50.0% | 75 | blank | p.47 |

Every screen name ends "— en-GB". The suffix is dropped in this table for width.

- Highest per-screen misclick rates: F4 Nearby Stops / List in block 12 (67.0%, p.31); O1 Welcome (56.0%, p.4); F2 Route Detail / Stop expanded, F3 Trip Planner / Destination autocomplete and S2B Text Size 200% (each 50.0%, p.17, p.25, p.47).
- Heatmaps / click maps: **not shown** anywhere in this PDF. The screen panels show only the screen image, and on p.24–47 the image area is blank.
- Off-path screens, exit points and individual participant paths: **not shown** in the PDF. The report says "View details in Maze" / "See online report"; the online report has them (§8).

---

## 6. Pages that would make good report figures

| Page | What it shows |
|---|---|
| p.1 | Cover: overall usability score 71, 9 responses, 21 blocks. Best single "headline result" figure. |
| p.13 | Weakest mission overview: "Save Cross Harbour Tunnel Station". Score 43, 88.9% success, 11.1% drop-off, 54.5% misclick, 38.3s. |
| p.14 | Same mission's expected-path funnel. Only 22.2% stayed on the expected path, with visible losses at screens 02 and 03. Strongest evidence for an F2 iteration. |
| p.17 | F2 Route Detail / Stop expanded screen with its real screenshot ("Save this stop" button visible). 50.0% misclick: shows where saving goes wrong. |
| p.16 | F1A expanded favourite card screenshot showing "Full route 27 min" next to "Next bus 5 min". Pairs with p.11, where 2 of 9 chose "5 min". |
| p.28 | Second-weakest mission overview: "Find bus stations nearby". Score 44, 100% success, 38.7% misclick. |
| p.29 | Its funnel: 44.4% expected path, with losses at both screens. |
| p.31 | F4 Nearby Stops / List, 67.0% misclick, screen score 29 (lowest in the report). The screenshot area is blank, so pair it with your own Figma export. |
| p.43 | Text-size mission funnel, 66.7% expected path (5-tick chart), useful for F5. |
| p.34 | Map mission funnel, 66.7% expected path. |
| p.21 | Ease of saving a station: the only question with "A Little Difficult" answers (2/9). Supports the save-flow finding. |
| p.50 | Overall impression: 8 Good, 1 Very Good, 0 negative. The satisfaction chart. |
| p.12, p.27, p.41, p.49 | Ease ratings for reading info, route search, Nearby and text size, for a combined "perceived ease" figure. Better to rebuild these as one chart from section 4. |
| p.4 | O1 Welcome screen with screenshot and 56.0% misclick, an onboarding finding. |
| p.2 / p.3 | Best-case mission (score 91, 100% expected path), useful for contrast. |

---

## 7. Not shown or not clearly readable

- **Not shown:** test dates or date range; device, OS, browser or platform; participant demographics; study-level completion or drop-off totals; usability sub-scores; separate indirect-success, give-up or bounce figures; heatmaps; click maps; off-path screens; individual paths; open-question answers (there are no open-question blocks); opinion-scale blocks (all ratings are Multiple Choice blocks); which MCQ option is correct.
- **Blank in the export:** the screen images on p.24, 25, 30, 31, 35, 36, 39, 44, 45, 46 and 47. The metrics on those pages are present and legible.
- **Unlabelled chart values:** the intermediate funnel values (e.g. about 55% at screen 02 in block 6) were read from chart pixel positions and are approximate. Only the end percentage of each funnel is printed.
- **Ambiguous:** the download date "11.8.2026" (most likely 8 Nov 2026, going by the PDF's metadata).
- Everything else was legible and was re-checked at higher resolution.

---

## 8. Online report: navigation paths (not in the PDF)

Source: the shared Maze report at <https://app.maze.co/report/Kowloon_bus_redesign/oBtJvOVQD-qXRtWj33TtgofbHD7gVvM9/intro>, read on 8 Nov 2026. Each mission page has a "Navigation overview" (a Sankey diagram of every screen-to-screen move) and an "Expected Path Analysis" with exact counts. The counts below were read from the report's own chart data (the participant count on each node and link, the same numbers its hover tooltips show), not estimated from the drawing. The online report has the same headline figures and multiple-choice results as the PDF; it adds no dates, devices, demographics or per-participant rows. Each mission defines **one** expected path.

Notation: `A → B ×n` = n participants moved from screen A to screen B. Screen codes are the Figma frame codes (en-GB page).

| Block · mission | Expected path (direct) | Where everyone went first | What the off-path participants did | Expected Path Analysis text |
|---|---|---|---|---|
| 1 · Let's get started! | O1 → O2 → S5 → F1: **9** | O1 → O2 ×9 | — | — |
| 3 · Take a ride on Bus No.8 | F1 → F1A: **9** | F1 → F1A ×9 | — | — |
| 6 · Save Cross Harbour Tunnel Station | F1 → F1A → F2 → F2A: **2** | F1 → F1A ×5; F1 → F3 (Trip), F1 → F4A (Nearby, via route 101 on Home), F1 → F4C (Map), F1 → F1B (Saved) ×1 each | At F1A, 2 went back to Home and 1 went to Saved. Two participants expanded the route 8 card, went back and expanded it again. In the end **8 reached the route screen (F2): 4 from the Home card, 4 by tapping route 8 in the Saved list**. The one failure spent 10 steps in Nearby list, route expanded and map (F4 / F4A / F4C) and dropped off. Successes reached F2A at step 3 (×3: 2 direct + 1 via Saved), 4, 5, 9 (×2) and 17. | Home: 22% misclick, 2 misclicked; 44.44%, 4 got lost. F1A: 60%, 3 got lost. |
| 7 · Check your saved stations | F1 → F1B: **7** | F1 → F1B ×7; F1 → F1A ×2 | One expanded route 8 on Home (F1A), went back and opened Saved (success at step 3). The other opened route 8's detail and moved between F2, F2A, the alight-alert sheet (M2) and Notices (F2C), then dropped off. | — |
| 9 · Hung Hom → Argyle Centre | F1 → F3 → F3A: **8** | F1 → F3 ×8; F1 → F4C ×1 | The one indirect participant opened the map first, then the trip planner, then results. | — |
| 12 · Find bus stations nearby | F1 → F4 → F4A: **4** | F1 → F4 ×6; F1 → F4C ×2; F1 → F4A ×1 | Of the 6 on the Nearby list, 4 opened route 101 directly and 2 switched to the map first (F4 → F4C → F4A). 2 went Home → Map → F4A. 1 tapped route 101 in Home's Nearby section and reached F4A in **one** step, shorter than the expected path. All 9 succeeded; 4 of the 5 indirect participants used the map. | Home: 22% misclick, 2 misclicked; 33.33%, 3 got lost. Nearby list (F4): **67% misclick, 5 misclicked**; 33.33%, 2 got lost. |
| 14 · Use a map | F1 → F4 → F4C: **6** | F1 → F4 ×6; F1 → F4C ×2; F1 → F3 ×1 | 2 used Home's "Map view" link and reached the map in **one** step, shorter than the expected path. 1 went Trip → Nearby → Trip → Nearby → More → Saved → Home before using Home's Map view (success at step 8). | — |
| 15 · Find landmarks | F4 → F4B: **8** | F4 → F4B ×8; F4 → F4C ×1 | The failure went Map → route expanded → Trip → Nearby → Map, then dropped off. | — |
| 18 · Adjust text size | F1 → F5 → S2A → S2B → F1: **6** | **F1 → F5 (More) ×7**; F1 → F4C ×1; F1 → F1B ×1 | One opened More, left for Nearby and Saved, then came back to More and finished. One tapped Map view first, returned and went to More. One opened Saved first, then More. All 9 succeeded. | — |

Points worth noting from these paths:
- **[derived]** In block 6, half of the participants who reached the route screen did so through the Saved list rather than the Home card, and three of the four who left Home first went to Trip, Nearby or the map.
- **[derived]** In blocks 12 and 14, three "indirect" successes took a *shorter* designed route than the expected path (route 101 from Home's Nearby section; Home's Map view link). Maze counts any route other than the single expected path as indirect, so the expected-path rates understate how efficiently participants found these screens.
- **[derived]** In block 18, 7 of 9 participants tapped More as their very first move.

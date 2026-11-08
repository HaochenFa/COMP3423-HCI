# Participants (Maze test, 5–7 Nov 2026)

Sources:
- [user_basic_information.docx](user_basic_information.docx): Chenyang's sheet with age, device and test date.
- [raw_data/](raw_data/): Maze's per-participant exports, one CSV per block (21 files, downloaded 8 Nov). Maze study ID 601915417.
  - `mission_1` … `mission_9` are the 9 tasks. Each has one row per tap, with the participant's start and end time, device, browser, path, time on each screen, and the position and target of every tap.
  - `mcq_1` … `mcq_12` are the 12 multiple-choice questions, one row per participant.
  - The file names count tasks and questions separately. Maze's block numbers, used everywhere else in our documents, count all 21 blocks:

    | Files | `mission_1`–`9` | `mcq_1`–`12` |
    |---|---|---|
    | Maze blocks | 1, 3, 6, 7, 9, 12, 14, 15, 18 | 2, 4, 5, 8, 10, 11, 13, 16, 17, 19, 20, 21 |

- [maze_csv_summary.py](maze_csv_summary.py) prints the per-task and multiple-choice tables below straight from the CSVs. It stops with an error if any total differs from the Maze PDF. Run `python3 user-test/maze_csv_summary.py`.
- The sheet and the CSVs were joined on the Tester ID, which the sheet calls "Maze ID". P1–P9 are numbered in order of start time.

## Profile

| P | Tester ID | Age | Device (sheet) | OS · model · browser (CSV) | Browser language | Date | Start–end (HKT) | Study time |
|---|---|---|---|---|---|---|---|---|
| P1 | 607053489 | 19 | Mobile phone | Android · PPG-AN00 · WeChat | zh-HK | 5 Nov | 20:20–20:31 | 10.5 min |
| P2 | 607067413 | 48 | Laptop | Mac OS · Macintosh · WeChat | zh-CN | 5 Nov | 20:34–20:53 | 18.2 min |
| P3 | 607074633 | 20 | Mobile phone | Android · SM-A5660 · WeChat | zh-CN | 5 Nov | 20:42–20:53 | 10.9 min |
| P4 | 607092204 | 45 | Laptop | Mac OS · Macintosh · Chrome | zh-CN | 5 Nov | 21:19–21:28 | 9.2 min |
| P5 | 607462892 | 19 | Laptop | Windows · Chrome | zh-CN | 6 Nov | 11:21–11:28 | 6.9 min |
| P6 | 607587743 | 19 | Laptop | Windows · Chrome | zh-CN | 6 Nov | 19:43–19:51 | 7.6 min |
| P7 | 608091492 | 19 | Laptop | Windows · WeChat | zh-CN | 7 Nov | 13:19–13:41 | 22.4 min |
| P8 | 608092742 | 19 | Tablet | iPad (reported as Mac OS) · Safari | zh-TW | 7 Nov | 13:24–13:31 | 6.7 min |
| P9 | 607192590 | 18 | Mobile phone | iOS · iPhone · Instagram | en-GB | 7 Nov | 19:29–19:36 | 7.2 min |

**Sheet vs CSV:** all nine devices and dates agree between the two sources. Each participant has the same start time, end time and device in all 21 files.

**Summary:**
- Ages 18–48 (median 19, mean 25.1). No one is aged 60+.
- Devices: laptop 5, phone 3, tablet 1.
- Study time 6.7–22.4 min (median 9.2, mean 11.1).
- All nine opened the test from a link: in WeChat 4, Chrome 3, Safari 1, Instagram 1.
- Browser language: zh-CN 6, zh-HK 1, zh-TW 1, en-GB 1.
  - This is the device setting only. It suggests most participants normally use Simplified Chinese, but it does not say where they are from. Do not report it as nationality.

**Recruitment and format (from the User Researcher, 8 Nov):**
- Participants were classmates, friends and relatives of the team, contacted by direct message.
- Each did the test alone and remotely, through the Maze link, with no moderator present.
- After the test, some participants asked the researcher about the design and its logic. These follow-up conversations gave informal feedback and first reactions.
- The Maze test had no open-question blocks, so the participant comments in [user_feedback.docx](user_feedback.docx) are the researcher's notes, not Maze data.

**Session times:** the table shows Hong Kong time (HKT).
- Maze does not document the timezone of its "Started at" column. We read it as UTC and added 8 hours (team decision, 8 Nov).
- If the times were Hong Kong time, three sessions would have started between 03:00 and 05:00.
- Every session began after the design's last save (5 Nov, 17:56 HKT).

## How the export matches the Maze PDF

- **All numbers agree.** For every task, the success rate, expected-path rate, misclick rate and average time match the PDF. So do the answer counts of all 12 questions (page numbers in [maze-figures.md](maze-figures.md)).
- **Maze's "Avg. duration" counts only the participants who succeeded.** The three tasks where someone gave up show this. With that participant included, the means would be: block 6, 42.3 s (Maze 38.3 s); block 7, 14.8 s (6.3 s); block 15, 15.6 s (10.6 s). Quote Maze's figure, and say it leaves out the participant who gave up.
- **Maze's per-screen "participants misclick rate"** counts only the participants who were on the expected path at that step. It is the share of them who misclicked during that visit. Counted this way, the click rows reproduce all 19 per-screen figures in the PDF. Example: F4 in block 12 shows 67% because 4 of the 6 who reached it at step 2 misclicked there (P2, P6, P7, P8), with 5 misclicks in all.
- **A "misclick" is a tap on anything not linked on the test page.** It does not mean the person was lost.
- **Do not add up rows.** Each participant's totals (clicks, misclicks, result, total time) are repeated on every row of a task.
- **Screens are Figma node IDs on the en-GB page.** `Screen ID` and `Path` hold IDs, not names. The script maps them to screen codes: O1 `26:1387`, O2 `26:1458`, S5 `28:2159`, F1 `20:601`, F1A `20:844`, F1B `27:1490`, F2 `20:1146`, F2A `29:2181`, F2C `29:2513`, M2 `30:2343`, F3 `20:1362`, F3A `1:1126`, F4 `20:1534`, F4A `20:1795`, F4B `31:3008`, F4C `32:2497`, F5 `20:2116`, S2A `358:2941`, S2B `358:3071`, and F1 (200%) `582:3847`, the frame "F1 · Home / 200% text".
- **Tap positions (`x`, `y`) are percentages of the screen's full content height, not of the 874 pt frame.** Several screens have content below the frame: Home's content is 1,098 pt tall, the Nearby list's 1,089 pt. We checked 112 named taps, covering every screen that has any. Measured this way, they all fall on the element Maze names. The one exception is the M2 alert sheet, whose taps fit the 874 pt frame. This only matters if anyone plots the taps.
- **Which version Maze tested.** Paths in block 18 end on "F1 · Home / 200% text", a frame added on 3 Nov, so the prototype was imported into Maze after that. The taps fit the 3 Nov 21:34 layout and the final 5 Nov 17:56 layout equally well. The export therefore cannot tell whether the 5 Nov arrival-row changes were in the tested copy.

## Results per participant

D = direct (expected path), I = indirect (succeeded another way), ✗ = gave up.

| P | Device | 1 | 3 | 6 | 7 | 9 | 12 | 14 | 15 | 18 | D / I / ✗ | Clicks | Misclicks | Task time (s) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P1 | Phone | D | D | I | D | D | I | I | D | I | 5 / 4 / 0 | 67 | 46 (68.7%) | 233 |
| P2 | Laptop | D | D | I | D | D | D | D | D | D | 8 / 1 / 0 | 48 | 24 (50.0%) | 387 |
| P3 | Phone | D | D | ✗ | I | I | I | I | D | D | 4 / 4 / 1 | 91 | 59 (64.8%) | 296 |
| P4 | Laptop | D | D | D | D | D | D | D | D | D | 9 / 0 / 0 | 19 | 1 (5.3%) | 136 |
| P5 | Laptop | D | D | I | D | D | D | D | D | D | 8 / 1 / 0 | 34 | 15 (44.1%) | 147 |
| P6 | Laptop | D | D | D | D | D | I | D | D | D | 8 / 1 / 0 | 27 | 8 (29.6%) | 154 |
| P7 | Laptop | D | D | I | D | D | D | D | ✗ | D | 7 / 1 / 1 | 42 | 20 (47.6%) | 359 |
| P8 | Tablet | D | D | I | D | D | I | D | D | I | 6 / 3 / 0 | 69 | 33 (47.8%) | 193 |
| P9 | Phone | D | D | I | ✗ | D | I | I | D | I | 4 / 4 / 1 | 64 | 34 (53.1%) | 196 |
| **All** | | 9 D | 9 D | 2 D | 7 D | 8 D | 4 D | 6 D | 8 D | 6 D | **59 / 19 / 3** | **461** | **240 (52.1%)** | |

Task time is the sum of the nine task times. It leaves out the time spent on the questions and reading instructions, so it is shorter than the study time in the profile.

## Results per task

Path codes are the Figma screen codes; screen names are in [maze-figures.md](maze-figures.md) §5. The "All" time is Maze's mean, over the participants who succeeded.

### Block 1: Let's get started!

| P | Result | Time (s) | Clicks | Misclicks | Path |
|---|---|---|---|---|---|
| P1 | Direct | 26.7 | 34 | 32 | O1 → O2 → S5 → F1 |
| P2 | Direct | 68.5 | 5 | 3 | O1 → O2 → S5 → F1 |
| P3 | Direct | 16.8 | 10 | 8 | O1 → O2 → S5 → F1 |
| P4 | Direct | 28.7 | 2 | 0 | O1 → O2 → S5 → F1 |
| P5 | Direct | 45.9 | 6 | 4 | O1 → O2 → S5 → F1 |
| P6 | Direct | 45.3 | 2 | 0 | O1 → O2 → S5 → F1 |
| P7 | Direct | 10.5 | 2 | 0 | O1 → O2 → S5 → F1 |
| P8 | Direct | 30.2 | 2 | 0 | O1 → O2 → S5 → F1 |
| P9 | Direct | 25.6 | 5 | 3 | O1 → O2 → S5 → F1 |
| **All** | **9 direct · 0 indirect · 0 gave up** | **33.1** | **68** | **50 (73.5%)** | |

- All 50 misclicks were on the welcome screen O1, and 34 of them were on the language buttons (繁體中文 / 简体中文 / English). Those buttons were not linked on the en-GB test page.
- P1 alone made 32 of the 50 misclicks, 22 of them on the language buttons.
- So the onboarding misclick rate is a test artefact concentrated in one participant, not a design problem.

### Block 3: Take a ride on Bus No.8

| P | Result | Time (s) | Clicks | Misclicks | Path |
|---|---|---|---|---|---|
| P1 | Direct | 5.2 | 1 | 0 | F1 → F1A |
| P2 | Direct | 39.0 | 1 | 0 | F1 → F1A |
| P3 | Direct | 26.4 | 3 | 2 | F1 → F1A |
| P4 | Direct | 11.9 | 1 | 0 | F1 → F1A |
| P5 | Direct | 4.6 | 1 | 0 | F1 → F1A |
| P6 | Direct | 10.0 | 1 | 0 | F1 → F1A |
| P7 | Direct | 31.2 | 1 | 0 | F1 → F1A |
| P8 | Direct | 11.9 | 2 | 1 | F1 → F1A |
| P9 | Direct | 8.2 | 1 | 0 | F1 → F1A |
| **All** | **9 direct · 0 indirect · 0 gave up** | **16.5** | **12** | **3 (25.0%)** | |

### Block 6: Save Cross Harbour Tunnel Station

| P | Result | Time (s) | Clicks | Misclicks | Path |
|---|---|---|---|---|---|
| P1 | Indirect | 33.9 | 6 | 1 | F1 → F1A → F1 → F1A → F2 → F2A |
| P2 | Indirect | 100.5 | 24 | 15 | F1 → F3 → F3A → F3 → F1 → F1B → F1 → F1B → F2 → F2A |
| P3 | Gave up | 73.9 | 40 | 32 | F1 → F4A → F4 → F4A → F4C → F4A → F4 → F4C → F4A |
| P4 | Direct | 22.0 | 4 | 1 | F1 → F1A → F2 → F2A |
| P5 | Indirect | 16.5 | 4 | 0 | F1 → F1A → F1B → F2 → F2A |
| P6 | Direct | 14.9 | 3 | 0 | F1 → F1A → F2 → F2A |
| P7 | Indirect | 22.5 | 4 | 1 | F1 → F1B → F2 → F2A |
| P8 | Indirect | 73.6 | 40 | 23 | F1 → F4C → F4A → F4B → F4 → F4C → F4 → F4C → F4 → F1B → F4 → F3 → F1 → F4 → F4A → F1B → F2 → F2A |
| P9 | Indirect | 22.8 | 9 | 0 | F1 → F1A → F1 → F1A → F1 → F1A → F1 → F1A → F2 → F2A |
| **All** | **2 direct · 6 indirect · 1 gave up** | **38.3** | **134** | **73 (54.5%)** | |

- **Where the misclicks went:**
  - On Home, P2 (8 taps), P8 (4) and P7 (1) tapped the Cross Harbour Tunnel stop card in the "Walking distance" section. That is 13 of the 14 misclicks on Home.
    - That card's stop name opens nothing. This is true on the test page and also on the zh-HK page, where only the card's route buttons are linked.
  - 43 of the 73 misclicks were P3's and P8's taps on the Nearby list, its route view and the map.
  - P8 also tapped "Edit" on Saved five times.
- **Ease ratings follow the paths** (block 8, "Is it easy for you to save a station?"):

  | P | Screens in path | Misclicks | Result | Rating |
  |---|---|---|---|---|
  | P4 | 4 | 1 | Direct | Really Easy |
  | P6 | 4 | 0 | Direct | Really Easy |
  | P7 | 4 | 1 | Indirect, via Saved | Really Easy |
  | P5 | 5 | 0 | Indirect, via Saved | Easy |
  | P1 | 6 | 1 | Indirect, expanded the card twice | Easy |
  | P2 | 10 | 15 | Indirect, via Trip and Saved | Moderate |
  | P9 | 10 | 0 | Indirect, expanded the card four times | Moderate |
  | P8 | 18 | 23 | Indirect, via Nearby, map and Saved | A Little Difficult |
  | P3 | 9 | 32 | Gave up in Nearby and the map | A Little Difficult |

  Everyone who needed six screens or fewer rated saving Easy or Really Easy. The four who needed nine or more, or gave up, rated it Moderate or A Little Difficult. The only two "difficult" ratings in the study came from the participant who gave up and the one with the longest path.

### Block 7: Have a check of your saved stations

| P | Result | Time (s) | Clicks | Misclicks | Path |
|---|---|---|---|---|---|
| P1 | Direct | 2.0 | 1 | 0 | F1 → F1B |
| P2 | Direct | 3.9 | 1 | 0 | F1 → F1B |
| P3 | Indirect | 17.7 | 4 | 1 | F1 → F1A → F1 → F1B |
| P4 | Direct | 5.8 | 1 | 0 | F1 → F1B |
| P5 | Direct | 3.4 | 1 | 0 | F1 → F1B |
| P6 | Direct | 6.5 | 1 | 0 | F1 → F1B |
| P7 | Direct | 4.8 | 1 | 0 | F1 → F1B |
| P8 | Direct | 6.0 | 1 | 0 | F1 → F1B |
| P9 | Gave up | 83.1 | 36 | 28 | F1 → F1A → F2 → F2A → F2 → F2A → M2 → F2A → F2C |
| **All** | **7 direct · 1 indirect · 1 gave up** | **6.3** | **47** | **29 (61.7%)** | |

- P9, on an iPhone, stayed in route 8's screens.
  - P9 made 28 misclicks there, including six taps on the Cross Harbour Tunnel row of the route screen, where the stop had just been saved.
  - P9 never reached the tab bar in this task. P9 did use it in block 18 (Saved, then More).
- P3's one misclick was on Home's "My favourites" heading.

### Block 9: From Hung Hom Station to Argyle Centre

| P | Result | Time (s) | Clicks | Misclicks | Path |
|---|---|---|---|---|---|
| P1 | Direct | 26.8 | 7 | 5 | F1 → F3 → F3A |
| P2 | Direct | 38.7 | 6 | 4 | F1 → F3 → F3A |
| P3 | Indirect | 47.8 | 11 | 8 | F1 → F4C → F3 → F3A |
| P4 | Direct | 13.0 | 2 | 0 | F1 → F3 → F3A |
| P5 | Direct | 9.4 | 2 | 0 | F1 → F3 → F3A |
| P6 | Direct | 23.9 | 5 | 3 | F1 → F3 → F3A |
| P7 | Direct | 97.6 | 2 | 0 | F1 → F3 → F3A |
| P8 | Direct | 12.7 | 3 | 1 | F1 → F3 → F3A |
| P9 | Direct | 11.9 | 5 | 3 | F1 → F3 → F3A |
| **All** | **8 direct · 1 indirect · 0 gave up** | **31.3** | **43** | **24 (55.8%)** | |

- **Where F3's 50% misclick rate comes from:** 4 of the 8 participants (P1, P2, P8, P9) tapped the destination already typed in the "To" field before choosing the suggestion below it.
  - The typed text is shown in red and was not linked on the test page.
  - The tap positions confirm it was the field, not the suggestion.
- P7 took 97.6 s with only 2 taps and no misclicks: a pause, not a navigation problem.

### Block 12: Find bus stations nearby

| P | Result | Time (s) | Clicks | Misclicks | Path |
|---|---|---|---|---|---|
| P1 | Indirect | 32.0 | 4 | 2 | F1 → F4C → F4A |
| P2 | Direct | 52.9 | 3 | 1 | F1 → F4 → F4A |
| P3 | Indirect | 9.3 | 4 | 2 | F1 → F4C → F4A |
| P4 | Direct | 20.1 | 2 | 0 | F1 → F4 → F4A |
| P5 | Direct | 18.7 | 2 | 0 | F1 → F4 → F4A |
| P6 | Indirect | 10.1 | 6 | 3 | F1 → F4 → F4C → F4A |
| P7 | Direct | 123.0 | 3 | 1 | F1 → F4 → F4A |
| P8 | Indirect | 7.9 | 6 | 3 | F1 → F4 → F4C → F4A |
| P9 | Indirect | 6.5 | 1 | 0 | F1 → F4A |
| **All** | **4 direct · 5 indirect · 0 gave up** | **31.2** | **31** | **12 (38.7%)** | |

- **Where the Nearby list's 67% comes from:** 3 of its 5 misclicks were taps on the "Bus stops" filter, which was already selected (P2, P6, P8).
- P7's 123.0 s with 3 taps is another pause. The median time for this task is 18.7 s.

### Block 14: Use a map and take a look around

| P | Result | Time (s) | Clicks | Misclicks | Path |
|---|---|---|---|---|---|
| P1 | Indirect | 9.0 | 1 | 0 | F1 → F4C |
| P2 | Direct | 26.4 | 2 | 0 | F1 → F4 → F4C |
| P3 | Indirect | 53.9 | 12 | 4 | F1 → F3 → F4 → F3 → F4 → F5 → F1B → F1 → F4C |
| P4 | Direct | 10.6 | 2 | 0 | F1 → F4 → F4C |
| P5 | Direct | 12.0 | 2 | 0 | F1 → F4 → F4C |
| P6 | Direct | 5.2 | 2 | 0 | F1 → F4 → F4C |
| P7 | Direct | 4.0 | 2 | 0 | F1 → F4 → F4C |
| P8 | Direct | 29.7 | 2 | 0 | F1 → F4 → F4C |
| P9 | Indirect | 3.7 | 1 | 0 | F1 → F4C |
| **All** | **6 direct · 3 indirect · 0 gave up** | **17.2** | **26** | **4 (15.4%)** | |

### Block 15: Find landmarks around me

| P | Result | Time (s) | Clicks | Misclicks | Path |
|---|---|---|---|---|---|
| P1 | Direct | 9.2 | 2 | 1 | F4 → F4B |
| P2 | Direct | 20.7 | 1 | 0 | F4 → F4B |
| P3 | Direct | 26.6 | 1 | 0 | F4 → F4B |
| P4 | Direct | 8.8 | 1 | 0 | F4 → F4B |
| P5 | Direct | 10.5 | 2 | 1 | F4 → F4B |
| P6 | Direct | 0.9 | 1 | 0 | F4 → F4B |
| P7 | Gave up | 55.6 | 23 | 18 | F4 → F4C → F4A → F3 → F4 → F4C |
| P8 | Direct | 6.0 | 1 | 0 | F4 → F4B |
| P9 | Direct | 2.1 | 1 | 0 | F4 → F4B |
| **All** | **8 direct · 0 indirect · 1 gave up** | **10.6** | **33** | **20 (60.6%)** | |

- All 18 of P7's misclicks were on the map: stop pins and their numbers, the PolyU label and the Locate me button. None of these were linked on the test page.

### Block 18: Adjust the size of texts

| P | Result | Time (s) | Clicks | Misclicks | Path |
|---|---|---|---|---|---|
| P1 | Indirect | 88.4 | 11 | 5 | F1 → F4C → F1 → F5 → S2A → S2B → F1 (200%) |
| P2 | Direct | 36.0 | 5 | 1 | F1 → F5 → S2A → S2B → F1 (200%) |
| P3 | Direct | 23.5 | 6 | 2 | F1 → F5 → S2A → S2B → F1 (200%) |
| P4 | Direct | 15.2 | 4 | 0 | F1 → F5 → S2A → S2B → F1 (200%) |
| P5 | Direct | 25.8 | 14 | 10 | F1 → F5 → S2A → S2B → F1 (200%) |
| P6 | Direct | 37.6 | 6 | 2 | F1 → F5 → S2A → S2B → F1 (200%) |
| P7 | Direct | 10.3 | 4 | 0 | F1 → F5 → S2A → S2B → F1 (200%) |
| P8 | Indirect | 15.3 | 12 | 5 | F1 → F5 → F4 → F1B → F5 → S2A → S2B → F1 (200%) |
| P9 | Indirect | 32.5 | 5 | 0 | F1 → F1B → F5 → S2A → S2B → F1 (200%) |
| **All** | **6 direct · 3 indirect · 0 gave up** | **31.6** | **67** | **25 (37.3%)** | |

- **Where S2B's 50% comes from:** at 200%, the A+ button is dimmed to 35% opacity because 200% is the maximum. P5, P6 and P8 tapped it 5 times anyway. P3 and P8 also tried the Calm mode toggle, which was not linked on the test page.
- On Home, P5 tapped the Quick access section 5 times before opening More.

## Multiple-choice answers per participant

**Comprehension** (✓ = correct, from the screen the question refers to; the PDF does not mark answers):

| P | 2 · Next Bus 8 (After 5 min) | 4 · Route 8 duration (27 min) | 10 · Bus and walk (87D, 2 min) | 13 · First bus (No.101) | 16 · To Queen Elizabeth Hospital (11K + 116) | 19 · Bus 116 at 200% (After 9 min) | Correct |
|---|---|---|---|---|---|---|---|
| P1 | ✓ | ✓ | ✗ 87D, 28 min | ✓ | ✓ | ✓ | 5/6 |
| P2 | ✓ | ✓ | ✗ 87D, 28 min | ✓ | ✓ | ✓ | 5/6 |
| P3 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| P4 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| P5 | ✓ | ✓ | ✗ 87D, 28 min | ✓ | ✓ | ✓ | 5/6 |
| P6 | ✓ | ✗ 5 min | ✗ 87D, 28 min | ✓ | ✓ | ✓ | 4/6 |
| P7 | ✓ | ✓ | ✗ 87D, 28 min | ✓ | ✓ | ✓ | 5/6 |
| P8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| P9 | ✓ | ✗ 5 min | ✗ 87D, 28 min | ✗ No.8 | ✓ | ✓ | 3/6 |
| **All** | 9/9 | 7/9 | 3/9 | 8/9 | 9/9 | 9/9 | **45/54** |

**Ratings** (RE = Really Easy, E = Easy, M = Moderate, LD = A Little Difficult; nobody chose Really Difficult. Overall: VG = Very Good, G = Good):

| P | 5 · Read bus info | 8 · Save a station | 11 · Search a route | 17 · Use Nearby | 20 · Adjust text size | 21 · Overall |
|---|---|---|---|---|---|---|
| P1 | E | E | E | E | E | G |
| P2 | RE | M | E | E | RE | G |
| P3 | E | LD | RE | RE | RE | G |
| P4 | E | RE | RE | E | E | G |
| P5 | RE | E | RE | M | M | G |
| P6 | RE | RE | RE | RE | RE | VG |
| P7 | RE | RE | E | M | RE | G |
| P8 | M | LD | E | RE | RE | G |
| P9 | E | M | E | E | M | G |

## What the per-participant data adds

1. **The three failures were three different people.**
   - P3 gave up in block 6 (saving; phone), P9 in block 7 (checking Saved; phone) and P7 in block 15 (landmarks; laptop).
   - No one gave up twice, and P4 took the expected path in all nine tasks.
2. **Phones and laptops differ.** In blocks 3–18 (block 1 left out, as everyone was direct there):

   | Device | Participants | Direct | Indirect | Gave up |
   |---|---|---|---|---|
   | Phone | P1, P3, P9 | 10/24 (42%) | 12 | 2 |
   | Laptop | P2, P4, P5, P6, P7 | 35/40 (88%) | 4 | 1 |
   | Tablet | P8 | 5/8 | 3 | 0 |

   - In blocks 12 and 14, 5 of the phone users' 6 indirect routes went through Home's own links instead of the Nearby tab: "Map view", or route 101 in Home's nearby section.
   - The data cannot say why. Possible reasons:
     - Maze's task panel takes more of a small screen; one failure comment says it hid the tab bar.
     - People on a phone may simply tap what is in front of them.
     - Three people are too few to generalise.
   - The app is meant for phones, so the phone result may be the more realistic one. Report the split, but draw no conclusion from it.
3. **Several researcher comments can be linked to a participant.** The researcher's notes are labelled by outcome, not by participant. Where only one participant had that outcome in a task, the export shows who it was:
   - Block 7 failure, "The 'Saved' button was obstructed by the bottom of the instructions": **P9** (iPhone). The path fits: P9 never reached the tab bar in that task. But P9 did use the tab bar in block 18, so the panel did not hide it for the whole test.
   - Block 7 indirect, "Thought the saved stations can directly be checked in 'My Favorite' column": **P3**. P3's only misclick in that task was on the "My favourites" heading.
   - Block 9 indirect, "Thought Search function should be bound with Map function": **P3**, who opened the map first.
   - Block 15 failure, "Thought the landmarks should be found on Map, but failed to click anything…": **P7** (laptop), with 18 taps on map pins and labels.
   - Block 6 failure: **P3**. The note "(Indirect & Failed) Not intuitive…" is shared with at least one indirect participant.
   - Block 18, "Thought the text size can be pinched open, but tapped Map View by accident": this fits **P1** (Android phone). P1 is the only participant whose path went from Home to the map in that task.
4. **Misclicks are mostly taps on things that were not linked on the test page.** The high per-screen rates break down as follows:
   - the language buttons on O1 (34 of 50);
   - the already-selected "Bus stops" filter on the Nearby list (3 of 5);
   - the typed destination on F3 (7 of 11);
   - the dimmed A+ and Calm mode on S2B (9 of 11);
   - map pins.

   The clearest exception is block 6, where three participants tapped the stop card on Home, looking for a way to the stop.
5. **Time can mislead.** P7's long times with very few taps (97.6 s in block 9, 123.0 s in block 12) look like pauses during an unmoderated session. Medians are steadier than Maze's means:

   | Block | 1 | 3 | 6 | 7 | 9 | 12 | 14 | 15 | 18 |
   |---|---|---|---|---|---|---|---|---|---|
   | Median (s), all 9 | 28.7 | 11.9 | 22.8 | 5.8 | 23.9 | 18.7 | 10.6 | 9.2 | 25.8 |

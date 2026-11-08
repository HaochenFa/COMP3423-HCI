# Participants (Maze test, 5–7 Nov 2026)

Sources:
- [user_basic_information.docx](user_basic_information.docx): Chenyang's sheet with age, device and test date.
- [kowloonbusredesign_block-results_mission.csv](kowloonbusredesign_block-results_mission.csv): Maze's per-participant export.
  - It holds **block 1 only** ("Let's get started!"), 86 click rows.
  - Maze study ID 601915417.
- The two sources were joined on the Tester ID, which the sheet calls "Maze ID".
- P1–P9 are numbered in order of start time.

## Profile

| P | Tester ID | Age | Device (sheet) | OS · model · browser (CSV) | Browser language | Date | Start–end (as exported) | Study time |
|---|---|---|---|---|---|---|---|---|
| P1 | 607053489 | 19 | Mobile phone | Android · PPG-AN00 · WeChat | zh-HK | 5 Nov | 12:20:42–12:31:13 | 10.5 min |
| P2 | 607067413 | 48 | Laptop | Mac OS · Macintosh · WeChat | zh-CN | 5 Nov | 12:34:53–12:53:07 | 18.2 min |
| P3 | 607074633 | 20 | Mobile phone | Android · SM-A5660 · WeChat | zh-CN | 5 Nov | 12:42:30–12:53:27 | 10.9 min |
| P4 | 607092204 | 45 | Laptop | Mac OS · Macintosh · Chrome | zh-CN | 5 Nov | 13:19:04–13:28:14 | 9.2 min |
| P5 | 607462892 | 19 | Laptop | Windows · Chrome | zh-CN | 6 Nov | 03:21:35–03:28:27 | 6.9 min |
| P6 | 607587743 | 19 | Laptop | Windows · Chrome | zh-CN | 6 Nov | 11:43:56–11:51:34 | 7.6 min |
| P7 | 608091492 | 19 | Laptop | Windows · WeChat | zh-CN | 7 Nov | 05:19:25–05:41:48 | 22.4 min |
| P8 | 608092742 | 19 | Tablet | iPad (reported as Mac OS) · Safari | zh-TW | 7 Nov | 05:24:58–05:31:41 | 6.7 min |
| P9 | 607192590 | 18 | Mobile phone | iOS · iPhone · Instagram | en-GB | 7 Nov | 11:29:38–11:36:47 | 7.2 min |

**Sheet vs CSV:** all nine devices and dates agree between the two sources.

**Summary:**
- Ages 18–48 (median 19, mean 25.1). No one is aged 60+.
- Devices: laptop 5, phone 3, tablet 1.
- Study time 6.7–22.4 min (median 9.2, mean 11.1).
- All nine opened the test from a link: in WeChat 4, Chrome 3, Safari 1, Instagram 1.
- Browser language: zh-CN 6, zh-HK 1, zh-TW 1, en-GB 1.
  - This is the device setting only. It suggests most participants normally use Simplified Chinese, but it does not say where they are from. Do not report it as nationality.

**Timezone:** Maze's help page does not say which timezone the "Started at" column uses.
- If the times are UTC, as the 03:00–05:00 starts suggest, add 8 hours for Hong Kong time:
  - 5 Nov sessions: 20:20–21:28;
  - 6 Nov: 11:21 and 19:43;
  - 7 Nov: 13:19, 13:24 and 19:29.
- On that reading, every session began after the design's last save (5 Nov, 17:56).
- If the times are Hong Kong time, the four 5 Nov sessions ran before Moling's accessibility pass (16:14–17:56).
- Ask Chenyang to confirm, for example from the time he remembers sending the link. Also ask when the prototype was imported into Maze, since Maze tests the imported copy.

## Block 1 per participant (onboarding, O1 → O2 → S5 → Home)

| P | Result | Time (s) | Clicks | Misclicks |
|---|---|---|---|---|
| P1 | Direct | 26.7 | 34 | 32 |
| P2 | Direct | 68.5 | 5 | 3 |
| P3 | Direct | 16.8 | 10 | 8 |
| P4 | Direct | 28.7 | 2 | 0 |
| P5 | Direct | 45.9 | 6 | 4 |
| P6 | Direct | 45.3 | 2 | 0 |
| P7 | Direct | 10.5 | 2 | 0 |
| P8 | Direct | 30.2 | 2 | 0 |
| P9 | Direct | 25.6 | 5 | 3 |
| **All** | **9/9 direct** | **mean 33.1** | **68** | **50 (73.5%)** |

- The mean time (33.1 s) and misclick rate (73.5%) match the Maze PDF exactly (p.2).
- All 50 misclicks were on the welcome screen O1, and 34 of them were on the language buttons (繁體中文 / 简体中文 / English). Those buttons were not linked on the en-GB test page.
- P1 alone made 32 of the 50 misclicks, 22 of them on the language buttons.
- So the onboarding misclick rate is a test artefact concentrated in one participant, not a design problem.
- The CSV counts are per participant. The export repeats them on every screen row, so do not add the rows up.

## Still missing

Per-participant data for the other mission blocks (3, 6, 7, 9, 12, 14, 15, 18). The CSV is a single-block export. Ask Chenyang to export each remaining mission the same way, or the whole study if Maze offers it, and save the files next to this one.

# Slides builder

Builds `slides/COMP3423_App1933_Presentation.pptx`, the 21-slide deck for the presentation video. The slide text, speaker notes and chart data live in `build_slides.js`, so edit them there and rebuild instead of editing the PowerPoint file by hand (hand edits are lost on the next build).

| File | What it holds |
|---|---|
| `build_slides.js` | Theme, slide layouts, every slide in order, speaker notes (presenter and timing for each slide) and the chart data |
| `slide_figs.py` | Images for the slides, written to `img/`: the original-app screenshots with numbered callouts (the numbers match the list on each feature slide), the marked English Home screens for the save finding, the text-size captures and the component crops |

The English screens come from `report/build/screens/`, the iteration strip from `report/figures/iteration/`, and the annotation helpers from `report/figures/annotated/annotlib.py`. Every number on the slides matches the report (`report/build/part3.js`) and the Maze data (`user-test/participants.md`).

## Build

One-time set-up:

```bash
cd slides/build && npm install
```

Build the images, then the deck:

```bash
python3 slide_figs.py
```

```bash
node build_slides.js
```

## Check

Render the slides to images and look at every one:

```bash
cd out && soffice --headless --convert-to pdf --outdir . ../../COMP3423_App1933_Presentation.pptx && pdftoppm -jpeg -r 80 COMP3423_App1933_Presentation.pdf slide
```

LibreOffice can wrap text slightly differently from PowerPoint, so check the final deck in PowerPoint as well.

The deck also has to survive an import into Canva. Canva's PowerPoint import drops native tables, replaces chart labels with numbers, loses line-end arrowheads and paragraph spacing, so the builder draws charts, tables and arrows from plain shapes and text boxes, and spaces list items with small empty lines. Keep it that way: no `addChart`, `addTable` or line arrowheads. Canva does import the speaker notes. Each note ends with its slide number, which is harmless. Table rows have fixed heights, so if you change a table's text, check that the `lines` count for each row still matches.

## Running order (about 9 min 50 s)

| Slides | Part | Presenter |
|---|---|---|
| 1–3 | Title, users, problems in the current app | Haochen Fa |
| 4 | Journey map | Chenyang Zhang |
| 5, 8, 9, 13 | Navigation, F2, F3 and the live Figma walkthrough | Xulu Zhang |
| 6, 7, 10, 19 | Visual language, F1, F4, iteration | Li-En Lo |
| 11, 12 | F5 and accessibility | Moling Kong |
| 14–18 | Testing and results | Chenyang Zhang |
| 20–21 | Next step, summary and limitations | Haochen Fa |

The live walkthrough (slide 13) uses the English prototype in Present mode with the iPhone device frame, flow "First launch (en-GB)". The click path is in that slide's notes.

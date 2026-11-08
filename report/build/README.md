# Report builder

Builds `report/COMP3423_App1933_Final_Report.docx`. The report text lives in the scripts, so edit the text here and rebuild instead of editing the Word file by hand (hand edits are lost on the next build).

| File | What it holds |
|---|---|
| `part1.js` | Cover page (workload table, links), 1 Introduction, 2 Related Work |
| `part2.js` | 3 Overall Design, 4 Feature Details |
| `part3.js` | 5 Testing, 6 Conclusion, References |
| `part4.js` | Appendices A–E |
| `lib.js` | Layout helpers: paragraphs, headings, bullets, booktabs-style tables, figures with captions |
| `build_report.js` | Page set-up, styles, header and footer; puts the parts together |
| `figs.py` | Builds the figures in `report/figures/final/` from the screen exports in `screens/` |
| `screens/` | The 32 en-GB screens exported from Figma at 402 × 874 |
| `check.sh` | Builds a test copy in `out/`, converts it to PDF and lists the page each section starts on |

Text markup inside the scripts: `**bold**`, `*italic*`, `[[text|url]]` for a link, `{{text}}` for a yellow-highlighted placeholder. A `\n` inside a table cell starts a new line.

## Build

One-time set-up:

```bash
cd report/build && npm install
```

Rebuild the figures (only needed after changing `figs.py` or `screens/`):

```bash
python3 figs.py
```

Build the report:

```bash
node build_report.js
```

Check the page count (the body, cover to Section 6, must end by page 20; references and appendices do not count):

```bash
./check.sh
```

## Other figure sources

- Annotated screenshots of the original app: `report/figures/annotated/make_figs.py`.
- Route-results iteration strip (Figure 5.2): `report/figures/iteration/strip_f3a.py`, from the captures in `report/figures/iteration/raw/`.
- Maze report pages (Figures A.1–A.3), from the image-only PDF:

  ```bash
  for p in 1 13 14; do pdftoppm -png -r 140 -f $p -l $p -singlefile user-test/maze_official_report.pdf report/figures/final/maze-p-$(printf %02d $p); done
  ```

- Site map: `report/figures/site-map.png`. Audit figures: `report/figures/audit/`.

Images are downscaled to 300 dpi at their placed size when the report is built (cached in `img/`), which keeps the DOCX near 12 MB.

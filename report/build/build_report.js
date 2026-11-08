// Builds the final report DOCX.
// usage: node build_report.js [OUT.docx]   (default: report/COMP3423_App1933_Final_Report.docx)
const fs = require("fs");
const path = require("path");
const L = require("./lib");
const { D, FONT, INK, INK2, RED, runs } = L;
const {
  Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType, LevelFormat,
  PageNumber, BorderStyle, TabStopType,
} = D;
const p1 = require("./part1");
const p2 = require("./part2");
const p3 = require("./part3");
const p4 = require("./part4");

const OUT = process.argv[2] || path.resolve(__dirname, "..", "COMP3423_App1933_Final_Report.docx");

const heading = (id, name, size, o = {}) => ({
  id, name, basedOn: "Normal", next: "Normal", quickFormat: true,
  run: { font: FONT, size, bold: true, color: o.color || INK },
  paragraph: {
    spacing: { before: o.before, after: o.after, line: 240 },
    keepNext: true, keepLines: true,
    outlineLevel: o.level,
    border: o.rule ? { bottom: { style: BorderStyle.SINGLE, size: 8, color: RED, space: 4 } } : undefined,
  },
});

const header = new Header({
  children: [new Paragraph({
    children: [
      new TextRun({ text: "COMP3423 Group Project · Group A21", font: FONT, size: 16, color: INK2 }),
      new TextRun({ text: "\tRe-designing App1933", font: FONT, size: 16, color: INK2 }),
    ],
    tabStops: [{ type: TabStopType.RIGHT, position: 9638 }],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "D0D0D0", space: 4 } },
  })],
});
const footer = new Footer({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 17, color: INK2 })],
  })],
});
const empty = () => new Header({ children: [new Paragraph({ children: [] })] });
const emptyF = () => new Footer({ children: [new Paragraph({ children: [] })] });

const doc = new Document({
  creator: "COMP3423 Group",
  title: "Re-designing App1933: COMP3423 Group Project Report",
  description: "Group project report: redesign of the KMB · LWB App1933 mobile app",
  styles: {
    default: { document: { run: { font: FONT, size: 20, color: INK }, paragraph: { spacing: { line: 264 } } } },
    paragraphStyles: [
      heading("Heading1", "Heading 1", 30, { before: 360, after: 200, level: 0, rule: true }),
      heading("Heading2", "Heading 2", 22, { before: 220, after: 90, level: 1 }),
      heading("Heading3", "Heading 3", 20, { before: 160, after: 60, level: 2 }),
    ],
    characterStyles: [{ id: "Hyperlink", name: "Hyperlink", run: { color: "1F4E9A", underline: {} } }],
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 340, hanging: 220 } }, run: { font: FONT } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 260 } } } }] },
    ],
  },
  sections: [
    {
      properties: {
        page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134, header: 567, footer: 510 } },
        titlePage: true,
      },
      headers: { default: header, first: empty() },
      footers: { default: footer, first: emptyF() },
      children: [
        ...p1.cover(),
        ...p1.intro(),
        ...p1.related(),
        ...p2.overall(),
        ...p2.features(),
        ...p3.testing(),
        ...p3.conclusion(),
        ...p3.references(),
        ...p4.appA(),
        ...p4.appB(),
        ...p4.appC(),
        ...p4.appD(),
        ...p4.appE(),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log("wrote", OUT, (buf.length / 1e6).toFixed(1) + " MB");
});

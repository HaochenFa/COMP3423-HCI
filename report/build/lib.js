// Layout helpers for the report (docx-js).
const fs = require("fs");
const path = require("path");
const D = require("docx");
const {
  Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, HeadingLevel, ExternalHyperlink, VerticalAlign, TableLayoutType,
} = D;

const FONT = { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft JhengHei", cs: "Arial" };
const INK = "1A1A1A", INK2 = "52514E", RED = "C8102E", RULE = "BFBFBF";
const TEXT_W_CM = 17.0;
const cm2dxa = (c) => Math.round((c / 2.54) * 1440);
const cm2px = (c) => Math.round((c / 2.54) * 96);

// Straight quotes are kept on purpose: curly quotes can fall back to the
// East Asian font in Word and render full-width next to Chinese text.
function smart(s) {
  return s;
}

// **bold**, *italic*, [[link text|url]], {{highlighted placeholder}}
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[\[[^\]]+\]\]|\{\{[^}]+\}\})/g;
  let last = 0, m;
  const push = (t, extra = {}) => { if (t) out.push(new TextRun({ text: smart(t), font: FONT, ...base, ...extra })); };
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) push(tok.slice(2, -2), { bold: true });
    else if (tok.startsWith("{{")) push(tok.slice(2, -2), { highlight: "yellow" });
    else if (tok.startsWith("[[")) {
      const [t, url] = tok.slice(2, -2).split("|");
      out.push(new ExternalHyperlink({ link: url, children: [new TextRun({ text: t, font: FONT, ...base, color: "1F4E9A", underline: {} })] }));
    } else push(tok.slice(1, -1), { italics: true });
    last = m.index + tok.length;
  }
  push(text.slice(last));
  return out;
}

const P = (text, o = {}) => new Paragraph({
  children: runs(text, o.run || {}),
  alignment: o.align || AlignmentType.LEFT,
  spacing: { after: o.after ?? 90, before: o.before ?? 0, line: o.line ?? 252 },
  keepNext: o.keepNext || false,
  indent: o.indent,
  style: o.style,
});

const H1 = (t, o = {}) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: smart(t), font: FONT })], pageBreakBefore: o.pageBreak || false });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: smart(t), font: FONT })] });
const H3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: smart(t), font: FONT })] });

const bullets = (items, o = {}) => items.map((t, i) => new Paragraph({
  children: runs(t, o.run || {}),
  numbering: { reference: o.ordered ? "numbers" : "bullets", level: 0, instance: o.instance },
  spacing: { after: i === items.length - 1 ? (o.after ?? 90) : 30, line: 252 },
  keepNext: o.keepNext || false,
}));

function pngSize(file) {
  const b = fs.readFileSync(file);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

// Downscale an image to about 300 dpi at its placed width (cached), to keep the DOCX small.
function printCopy(file, widthCm) {
  const target = Math.round((widthCm / 2.54) * 300);
  if (pngSize(file).w <= target * 1.15) return file;
  const dir = path.join(__dirname, "img");
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, `${path.basename(file, ".png")}-${target}.png`);
  if (!fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(file).mtimeMs) {
    require("child_process").execFileSync("python3", ["-c",
      "import sys; from PIL import Image; im=Image.open(sys.argv[1]).convert('RGBA'); w,h=im.size; t=int(sys.argv[2]); bg=Image.new('RGB',im.size,'white'); bg.paste(im,mask=im.split()[3]); bg.resize((t, round(h*t/w)), Image.LANCZOS).save(sys.argv[3], optimize=True)",
      file, String(target), out]);
  }
  return out;
}

function figure(file, widthCm, label, caption, o = {}) {
  const { w, h } = pngSize(file);
  const wpx = cm2px(widthCm), hpx = Math.round((wpx * h) / w);
  const src = printCopy(file, widthCm);
  return [
    new Paragraph({
      children: [new ImageRun({ type: "png", data: fs.readFileSync(src), transformation: { width: wpx, height: hpx },
        altText: { title: label, description: caption.replace(/\*/g, ""), name: label } })],
      alignment: AlignmentType.CENTER, keepNext: true, spacing: { before: o.before ?? 60, after: 40 },
    }),
    new Paragraph({
      children: [new TextRun({ text: label + ". ", bold: true, font: FONT, size: 17, color: INK }), ...runs(caption, { size: 17, color: INK2 })],
      alignment: AlignmentType.LEFT, spacing: { after: o.after ?? 180, line: 252 },
    }),
  ];
}

const caption = (label, text, o = {}) => new Paragraph({
  children: [new TextRun({ text: label + ". ", bold: true, font: FONT, size: 17, color: INK }), ...runs(text, { size: 17, color: INK2 })],
  spacing: { before: o.before ?? 120, after: 60, line: 252 }, keepNext: true,
});

// booktabs-style table, white background, no vertical rules
function table(headers, rows, widthsCm, o = {}) {
  const size = o.size || 16;
  const widths = widthsCm.map(cm2dxa);
  const total = widths.reduce((a, b) => a + b, 0);
  const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  const mk = (txt, i, j, isHead, isLast) => {
    const lines = String(txt).split("\n");
    const topRule = isHead || (o.noHeader && i === 1);
    return new TableCell({
      width: { size: widths[j], type: WidthType.DXA },
      verticalAlign: VerticalAlign.TOP,
      margins: { top: 30, bottom: 30, left: 70, right: 70 },
      borders: {
        top: topRule ? { style: BorderStyle.SINGLE, size: 10, color: INK } : none,
        bottom: isHead ? { style: BorderStyle.SINGLE, size: 4, color: INK } : (isLast ? { style: BorderStyle.SINGLE, size: 10, color: INK } : { style: BorderStyle.SINGLE, size: 2, color: "E3E3E3" }),
        left: none, right: none,
      },
      children: lines.map((ln) => new Paragraph({
        children: runs(ln, { size, bold: isHead || (o.boldFirst && j === 0) ? true : undefined, color: INK }),
        alignment: (o.align && o.align[j]) || AlignmentType.LEFT,
        spacing: { after: 0, line: 240 },
        // keep short tables on one page: every row but the last holds on to the next
        keepNext: o.split ? isHead : !isLast,
      })),
    });
  };
  const trs = o.noHeader ? [] : [new TableRow({ tableHeader: true, cantSplit: true, children: headers.map((h, j) => mk(h, 0, j, true, false)) })];
  rows.forEach((r, i) => trs.push(new TableRow({ cantSplit: true, children: r.map((c, j) => mk(c, i + 1, j, false, i === rows.length - 1)) })));
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: widths, rows: trs, layout: TableLayoutType.FIXED, alignment: AlignmentType.CENTER });
}

const spacer = (pts = 6) => new Paragraph({ children: [], spacing: { after: 0, before: 0, line: pts * 20, lineRule: "exact" } });

module.exports = { D, FONT, INK, INK2, RED, RULE, TEXT_W_CM, cm2dxa, cm2px, smart, runs, P, H1, H2, H3, bullets, figure, caption, table, spacer };

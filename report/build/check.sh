#!/bin/zsh
# Build a test copy of the report, convert it to PDF with LibreOffice and list
# the page each section starts on. The body (cover to Section 6) must end by page 20.
# usage: ./check.sh            output in report/build/out/
B=${0:A:h}
mkdir -p $B/out
cd $B && node build_report.js $B/out/report.docx >/dev/null || exit 1
cd $B/out && zip -d report.docx '*/' >/dev/null 2>&1
/Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf report.docx >/dev/null 2>&1
N=$(pdfinfo report.pdf | awk '/Pages/{print $2}')
echo "pages: $N"
for i in $(seq 1 $N); do
  t=$(pdftotext -f $i -l $i -layout report.pdf - | grep -m1 -oE '^ *(1\. Introduction|2\. Related Work|3\. Overall Design|4\. Feature Details|5\. Testing Method|6\. Conclusion|References|Appendix [A-E]\.|4\.[1-5] F[1-5]|5\.[1-4] [A-Z][a-z]+|6\.[1-3] [A-Z][a-z]+)' | sed 's/^ *//')
  [ -n "$t" ] && echo "p$i: $t"
done
exit 0

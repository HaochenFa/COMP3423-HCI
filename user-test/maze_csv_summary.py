"""Summarise the Maze per-participant exports in raw_data/ and check them against the Maze PDF.

Run from anywhere:  python3 user-test/maze_csv_summary.py
Prints Markdown tables (used in participants.md) and stops with an error if any
mission or multiple-choice total differs from the figures printed in the Maze PDF.
"""
import collections
import csv
import glob
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, 'raw_data')

# Tester ID -> participant number (order of start time; see participants.md)
P = {'607053489': 'P1', '607067413': 'P2', '607074633': 'P3', '607092204': 'P4',
     '607462892': 'P5', '607587743': 'P6', '608091492': 'P7', '608092742': 'P8',
     '607192590': 'P9'}
# Figma node IDs on the en-GB page -> screen codes
SCREEN = {'26:1387': 'O1', '26:1458': 'O2', '28:2159': 'S5', '20:601': 'F1', '20:844': 'F1A',
          '27:1490': 'F1B', '20:1146': 'F2', '29:2181': 'F2A', '29:2513': 'F2C', '30:2343': 'M2',
          '20:1362': 'F3', '1:1126': 'F3A', '20:1534': 'F4', '20:1795': 'F4A', '31:3008': 'F4B',
          '32:2497': 'F4C', '20:2116': 'F5', '358:2941': 'S2A', '358:3071': 'S2B',
          '582:3847': 'F1 (200%)'}
# File number -> Maze block number (blocks are numbered across missions and questions)
MISSION_BLOCK = {1: 1, 2: 3, 3: 6, 4: 7, 5: 9, 6: 12, 7: 14, 8: 15, 9: 18}
MCQ_BLOCK = {1: 2, 2: 4, 3: 5, 4: 8, 5: 10, 6: 11, 7: 13, 8: 16, 9: 17, 10: 19, 11: 20, 12: 21}
# Maze PDF figures: success %, expected path %, misclick %, avg. duration (s)
PDF = {1: (100.0, 100.0, 73.5, 33.1), 3: (100.0, 100.0, 25.0, 16.5), 6: (88.9, 22.2, 54.5, 38.3),
       7: (88.9, 77.8, 61.7, 6.3), 9: (100.0, 88.9, 55.8, 31.3), 12: (100.0, 44.4, 38.7, 31.2),
       14: (100.0, 66.7, 15.4, 17.2), 15: (88.9, 88.9, 60.6, 10.6), 18: (100.0, 66.7, 37.3, 31.6)}
PDF_MCQ = {2: {'After 5 min': 9}, 4: {'27 min': 7, '5 min': 2},
           5: {'Really Easy': 4, 'Easy': 4, 'Moderate': 1},
           8: {'Really Easy': 3, 'Easy': 2, 'Moderate': 2, 'A Little Difficult': 2},
           10: {'87D, 28 min': 6, '87D, 2 min': 3}, 11: {'Easy': 5, 'Really Easy': 4},
           13: {'Bus No.101': 8, 'Bus No.8': 1}, 16: {'No. 11K + No. 116': 9},
           17: {'Easy': 4, 'Really Easy': 3, 'Moderate': 2}, 19: {'After 9 min': 9},
           20: {'Really Easy': 5, 'Easy': 2, 'Moderate': 2}, 21: {'Good': 8, 'Very Good': 1}}


def read(path):
    with open(path, newline='', encoding='utf-8-sig') as f:
        return list(csv.DictReader(f))


def number(path, kind):
    return int(re.search(kind + r'_(\d+)', os.path.basename(path)).group(1))


def missions():
    for path in sorted(glob.glob(os.path.join(RAW, 'mission_*.csv')), key=lambda p: number(p, 'mission')):
        block = MISSION_BLOCK[number(path, 'mission')]
        rows = read(path)
        people = collections.OrderedDict()
        for r in rows:
            people.setdefault(r['Tester ID'], []).append(r)
        print(f'\n### Block {block}: {rows[0]["Block title"]}\n')
        print('| P | Result | Time (s) | Clicks | Misclicks | Path |')
        print('|---|---|---|---|---|---|')
        n = len(people)
        res = collections.Counter()
        clicks = mis = 0
        ok_times = []
        for tid in sorted(people, key=lambda t: P[t]):
            r = people[tid][0]
            for x in people[tid]:  # totals repeat on every row of a participant
                assert x['Total click count'] == r['Total click count']
            result = ('Direct' if r['Direct success'] == 'TRUE' else
                      'Indirect' if r['Indirect success'] == 'TRUE' else 'Gave up')
            res[result] += 1
            c, m = int(r['Total click count']), int(r['Total misclick count'])
            clicks += c
            mis += m
            t = float(r['Total duration (seconds)'])
            if result != 'Gave up':
                ok_times.append(t)
            path = ' → '.join(SCREEN[s.strip()] for s in r['Path'].split(' > '))
            print(f'| {P[tid]} | {result} | {t:.1f} | {c} | {m} | {path} |')
        success = 100 * (res['Direct'] + res['Indirect']) / n
        direct = 100 * res['Direct'] / n
        rate = 100 * mis / clicks
        avg = sum(ok_times) / len(ok_times)
        print(f'| **All** | **{res["Direct"]} direct · {res["Indirect"]} indirect · {res["Gave up"]} gave up** '
              f'| **{avg:.1f}** | **{clicks}** | **{mis} ({rate:.1f}%)** | |')
        expected = PDF[block]
        got = (round(success, 1), round(direct, 1), round(rate, 1), round(avg, 1))
        assert got == expected, f'block {block}: CSV {got} != PDF {expected}'


def questions():
    print('\n### Multiple-choice answers\n')
    table = collections.defaultdict(dict)
    titles = {}
    for path in sorted(glob.glob(os.path.join(RAW, 'mcq_*.csv')), key=lambda p: number(p, 'mcq')):
        block = MCQ_BLOCK[number(path, 'mcq')]
        rows = read(path)
        titles[block] = rows[0]['Block title']
        cols = list(rows[0].keys())
        options = cols[cols.index('Fbclid') + 1:]
        counts = collections.Counter()
        for r in rows:
            if options == ['Choice', 'Value']:
                answer = r['Value']
            else:  # multiple answers allowed: one 0/1 column per option
                answer = ' + '.join(o for o in options if r[o] == '1')
            table[P[r['Tester ID']]][block] = answer
            counts[answer] += 1
        assert dict(counts) == PDF_MCQ[block], f'block {block}: CSV {dict(counts)} != PDF {PDF_MCQ[block]}'
    blocks = sorted(titles)
    for b in blocks:
        print(f'- {b}: {titles[b]}')
    print('\n| P | ' + ' | '.join(str(b) for b in blocks) + ' |')
    print('|---|' + '---|' * len(blocks))
    for p in sorted(table):
        print(f'| {p} | ' + ' | '.join(table[p][b] for b in blocks) + ' |')


if __name__ == '__main__':
    missions()
    questions()
    print('\nAll mission and multiple-choice totals match the Maze PDF.')

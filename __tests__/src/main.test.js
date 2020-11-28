import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDiff, getData, toFormatedString } from '../../src/main.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

describe('Generating diff.', () => {
  const data1 = JSON.parse(readFile('flat1.json'));
  const data2 = JSON.parse(readFile('flat2.json'));

  test('Should work.', () => {
    const actual = generateDiff(data1, data2);
    const expected = [
      [' ', 'host', 'hexlet.io'],
      ['-', 'timeout', 50],
      ['+', 'timeout', 20],
      ['-', 'proxy', '123.234.53.22'],
      ['-', 'follow', false],
      ['+', 'verbose', true],
    ];

    expect(actual).toEqual(expected);
  });
});

describe('Getting data.', () => {
  test('Flat JSON', () => {
    const actual1 = getData(__dirname, '../../__fixtures__/flat1.json');
    const actual2 = getData(__dirname, '../../__fixtures__/flat2.json');

    const expected1 = '{\n  "host": "hexlet.io",\n  "timeout": 50,\n  "proxy": "123.234.53.22",\n  "follow": false\n}\n';
    const expected2 = '{\n  "timeout": 20,\n  "verbose": true,\n  "host": "hexlet.io"\n}\n';

    expect(actual1).toEqual(expected1);
    expect(actual2).toEqual(expected2);
  });
});

describe('Convert to formatted string.', () => {
  const actual = [
    [' ', 'host', 'hexlet.io'],
    ['-', 'timeout', 50],
    ['+', 'timeout', 20],
    ['-', 'proxy', '123.234.53.22'],
    ['-', 'follow', false],
    ['+', 'verbose', true],
  ];
  const expected = [
    '{',
    '  - follow: false',
    '    host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
    '}',
  ].join('\n');

  test('Should work.', () => {
    expect(toFormatedString(actual)).toBe(expected);
  });
});

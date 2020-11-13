import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDiff, parse, toFormatedString } from '../src/flatJSON.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
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

describe('Parsing data.', () => {
  const data1 = readFile('flat1.json');
  const data2 = readFile('flat2.json');

  test('Should work.', () => {
    const actual1 = parse(data1);
    const actual2 = parse(data2);
    const expected1 = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    };
    const expected2 = {
      timeout: 20,
      verbose: true,
      host: 'hexlet.io',
    };

    expect(actual1).toEqual(expected1);
    expect(actual2).toEqual(expected2);
  });
});

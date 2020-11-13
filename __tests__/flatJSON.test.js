import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDiff, toFormatedString } from '../src/flatJSON.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

describe('Test main functionality.', () => {
  const data1 = JSON.parse(readFile('flat1.json'));
  const data2 = JSON.parse(readFile('flat2.json'));

  describe('Generating diff.', () => {
    const actual = generateDiff(data1, data2);
    const expected = [
      [' ', 'host', 'hexlet.io'],
      ['-', 'timeout', 50],
      ['+', 'timeout', 20],
      ['-', 'proxy', '123.234.53.22'],
      ['-', 'follow', false],
      ['+', 'verbose', true],
    ];

    test('should work', () => {
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

    test('should work', () => {
      expect(toFormatedString(actual)).toBe(expected);
    });
  });
});

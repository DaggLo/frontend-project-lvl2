import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff, { generateDiff, toFormatedString } from '../src/main.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

describe('Test main functionality.', () => {
  const data1 = JSON.parse(readFile('flat1.json'));
  const data2 = JSON.parse(readFile('flat2.json'));

  describe('Generating diff.', () => {
    const expected = [
      [' ', 'host', 'hexlet.io'],
      ['-', 'timeout', 50],
      ['+', 'timeout', 20],
      ['-', 'proxy', '123.234.53.22'],
      ['-', 'follow', false],
      ['+', 'verbose', true],
    ];

    test('should work', () => {
      expect(generateDiff(data1, data2)).toEqual(expected);
    });
  });

  describe('Convert to formatted string.', () => {
    const actual = generateDiff(data1, data2);
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
      expect(toFormatedString(actual)).toEqual(expected);
    });
  });

  describe('Overall flow.', () => {
    const path1 = getFixturePath('flat1.json');
    const path2 = getFixturePath('flat2.json');
    const actual = gendiff(path1, path2);
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
      expect(actual).toEqual(expected);
    });
  });
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  generateDiff, getData, isValidArgs, toFormatedString,
} from '../../src/main.js';

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

describe('Args validation.', () => {
  const path1 = getFixturePath('flat1.json');
  const path2 = getFixturePath('flat2.json');
  const path3 = getFixturePath('flat1.yml');
  const path4 = getFixturePath('flat2.yml');

  describe('Valid args.', () => {
    test('Should work.', () => {
      const actual1 = isValidArgs(path1, path2);
      const actual2 = isValidArgs(path3, path4);
      const actual3 = isValidArgs(path1, path4);
      const actual4 = isValidArgs(path2, path3);

      expect(actual1).toBe(true);
      expect(actual2).toBe(true);
      expect(actual3).toBe(true);
      expect(actual4).toBe(true);
    });
  });

  describe('Not valid args.', () => {
    test('More or less than two args.', () => {
      expect(isValidArgs()).toBe(false);
      expect(isValidArgs(path1)).toBe(false);
      expect(isValidArgs(path1, path2, path3)).toBe(false);
      expect(isValidArgs(path1, path2, path3, path4)).toBe(false);
    });

    test('Not valid paths.', () => {
      expect(isValidArgs(3, path2)).toBe(false);
      expect(isValidArgs(null, path3)).toBe(false);
      expect(isValidArgs(path1, undefined)).toBe(false);
      expect(isValidArgs('', path4)).toBe(false);
      expect(isValidArgs(path3, 'hehehe')).toBe(false);
      expect(isValidArgs('.', path2)).toBe(false);
      expect(isValidArgs(path1, '..')).toBe(false);
    });
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

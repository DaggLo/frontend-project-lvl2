import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { attach, typeTag, contents } from '@hexlet/tagged-types';

import {
  generateDiff, getData, isValidArgs, parse, tagData, toFormatedString,
} from '../../src/main.js';

import parseJSON from '../../src/parsers/json.js';
import parseYAML from '../../src/parsers/yaml.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

// Paths to fixtures.
const path1 = getFixturePath('flat1.json');
const path2 = getFixturePath('flat2.json');
const path3 = getFixturePath('flat1.yml');
const path4 = getFixturePath('flat2.yml');
const path5 = getFixturePath('empty.json');
const path6 = getFixturePath('empty.yml');

// Files readed.
const flatJson1 = readFile('flat1.json');
const flatJson2 = readFile('flat2.json');
const flatYaml1 = readFile('flat1.yml');
const flatYaml2 = readFile('flat2.yml');

const emptyJson = readFile('empty.json');
const emptyYaml = readFile('empty.yml');

// Tests.
describe('Generating diff.', () => {
  const data1 = parseJSON(flatJson1);
  const data2 = parseJSON(flatJson2);
  const data3 = parseYAML(flatYaml1);
  const data4 = parseYAML(flatYaml2);

  describe('Standard cases.', () => {
    test('Should work #1.', () => {
      const actual1 = generateDiff(data1, data2);
      const actual2 = generateDiff(data3, data4);
      const actual3 = generateDiff(data1, data4);
      const actual4 = generateDiff(data3, data2);

      const expected = [
        [' ', 'host', 'hexlet.io'],
        ['-', 'timeout', 50],
        ['+', 'timeout', 20],
        ['-', 'proxy', '123.234.53.22'],
        ['-', 'follow', false],
        ['+', 'verbose', true],
      ];

      expect(actual1).toEqual(expected);
      expect(actual2).toEqual(expected);
      expect(actual3).toEqual(expected);
      expect(actual4).toEqual(expected);
    });

    test('Should work #2.', () => {
      const actual1 = generateDiff(data2, data1);
      const actual2 = generateDiff(data4, data3);
      const actual3 = generateDiff(data4, data1);
      const actual4 = generateDiff(data2, data3);

      const expected = [
        ['-', 'timeout', 20],
        ['+', 'timeout', 50],
        ['-', 'verbose', true],
        [' ', 'host', 'hexlet.io'],
        ['+', 'proxy', '123.234.53.22'],
        ['+', 'follow', false],
      ];

      expect(actual1).toEqual(expected);
      expect(actual2).toEqual(expected);
      expect(actual3).toEqual(expected);
      expect(actual4).toEqual(expected);
    });
  });

  describe('Corner cases.', () => {
    test('Comparing files with the same contents.', () => {
      const actual1 = generateDiff(data1, data3);
      const actual2 = generateDiff(data2, data4);

      const expected1 = [
        [' ', 'host', 'hexlet.io'],
        [' ', 'timeout', 50],
        [' ', 'proxy', '123.234.53.22'],
        [' ', 'follow', false],
      ];
      const expected2 = [
        [' ', 'timeout', 20],
        [' ', 'verbose', true],
        [' ', 'host', 'hexlet.io'],
      ];

      expect(actual1).toEqual(expected1);
      expect(actual2).toEqual(expected2);
    });

    test('Comparing with empty file.', () => {
      const emptyData1 = parseJSON(emptyJson);
      const emptyData2 = parseYAML(emptyYaml);

      const actual1 = generateDiff(data1, emptyData1);
      const actual2 = generateDiff(emptyData2, data4);
      const actual3 = generateDiff(data3, emptyData1);
      const actual4 = generateDiff(emptyData2, data2);

      const expected1 = [
        ['-', 'host', 'hexlet.io'],
        ['-', 'timeout', 50],
        ['-', 'proxy', '123.234.53.22'],
        ['-', 'follow', false],
      ];
      const expected2 = [
        ['+', 'timeout', 20],
        ['+', 'verbose', true],
        ['+', 'host', 'hexlet.io'],
      ];

      expect(actual1).toEqual(expected1);
      expect(actual2).toEqual(expected2);
      expect(actual3).toEqual(expected1);
      expect(actual4).toEqual(expected2);
    });
  });
});

describe('Getting data.', () => {
  test('Files with content.', () => {
    const actual1 = getData(__dirname, '../../__fixtures__/flat1.json');
    const actual2 = getData(__dirname, '../../__fixtures__/flat2.json');
    const actual3 = getData(__dirname, '../../__fixtures__/flat1.yml');
    const actual4 = getData(__dirname, '../../__fixtures__/flat2.yml');

    const expected1 = '{\n  "host": "hexlet.io",\n  "timeout": 50,\n  "proxy": "123.234.53.22",\n  "follow": false\n}\n';
    const expected2 = '{\n  "timeout": 20,\n  "verbose": true,\n  "host": "hexlet.io"\n}\n';
    const expected3 = '---\n\nhost: hexlet.io\ntimeout: 50\nproxy: 123.234.53.22\nfollow: false\n';
    const expected4 = '---\n\n{timeout: 20, verbose: true, host: hexlet.io}\n';

    expect(actual1).toEqual(expected1);
    expect(actual2).toEqual(expected2);
    expect(actual3).toEqual(expected3);
    expect(actual4).toEqual(expected4);
  });

  test('Empty files.', () => {
    const actual1 = getData(__dirname, '../../__fixtures__/empty.json');
    const actual2 = getData(__dirname, '../../__fixtures__/empty.yml');

    // const expected = '{}';

    expect(actual1).toEqual(emptyJson);
    expect(actual2).toEqual(emptyYaml);
  });
});

describe('Args validation.', () => {
  describe('Valid args.', () => {
    test('Should work.', () => {
      const actual1 = isValidArgs(path1, path2);
      const actual2 = isValidArgs(path3, path4);
      const actual3 = isValidArgs(path1, path4);
      const actual4 = isValidArgs(path2, path3);
      const actual5 = isValidArgs(path1, path5);
      const actual6 = isValidArgs(path6, path3);

      expect(actual1).toBe(true);
      expect(actual2).toBe(true);
      expect(actual3).toBe(true);
      expect(actual4).toBe(true);
      expect(actual5).toBe(true);
      expect(actual6).toBe(true);
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

    test('Non-existent paths.', () => {
      const wrongPath1 = getFixturePath('flat3.json');
      const wrongPath2 = getFixturePath('flat3.yml');

      expect(isValidArgs(path1, wrongPath1)).toBe(false);
      expect(isValidArgs(wrongPath1, wrongPath2)).toBe(false);
    });

    test('Unsupported file extensions.', () => {
      const unsupportedFile = getFixturePath('unsupp.abc');

      expect(isValidArgs(path1, unsupportedFile)).toBe(false);
    });
  });
});

describe('Convert to formatted string.', () => {
  test('Should work #1.', () => {
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

    expect(toFormatedString(actual)).toBe(expected);
  });

  test('Should work #2.', () => {
    const actual = [
      [' ', 'host', 'hexlet.io'],
      [' ', 'timeout', 20],
      [' ', 'verbose', true],
    ];

    const expected = [
      '{',
      '    host: hexlet.io',
      '    timeout: 20',
      '    verbose: true',
      '}',
    ].join('\n');

    expect(toFormatedString(actual)).toBe(expected);
  });
});

describe('Parsing data.', () => {
  test('Parsing JSON.', () => {
    const tagged1 = attach('json', flatJson1);
    const tagged2 = attach('json', flatJson2);

    const actual1 = parse(tagged1);
    const actual2 = parse(tagged2);

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

  test('Parsing YAML.', () => {
    const tagged1 = attach('yml', flatYaml1);
    const tagged2 = attach('yaml', flatYaml2);

    const actual1 = parse(tagged1);
    const actual2 = parse(tagged2);

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

  test('Parsing empty files.', () => {
    const tagged1 = attach('json', emptyJson);
    const tagged2 = attach('yaml', emptyYaml);

    const actual1 = parse(tagged1);
    const actual2 = parse(tagged2);

    const expected1 = {};
    const expected2 = {};

    expect(actual1).toEqual(expected1);
    expect(actual2).toEqual(expected2);
  });
});

describe('Tagging data.', () => {
  test('Should work.', () => {
    const tagged1 = tagData(flatJson1, path1);
    const tagged2 = tagData(flatYaml2, path4);
    const actual1 = [typeTag(tagged1), contents(tagged1)];
    const actual2 = [typeTag(tagged2), contents(tagged2)];

    const expected1 = ['json', flatJson1];
    const expected2 = ['yml', flatYaml2];

    expect(actual1).toEqual(expected1);
    expect(actual2).toEqual(expected2);
  });
});

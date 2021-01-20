import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import gendiff from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8').trimEnd();

const json1 = getFixturePath('1.json');
const json2 = getFixturePath('2.json');
const yaml1 = getFixturePath('1.yaml');
const yaml2 = getFixturePath('2.yaml');

describe('Standard cases.', () => {
  const expectedStylish = readFile('expected.stylish');
  const expectedPlain = readFile('expected.plain');
  const rawJson = readFile('expected.json');
  const expectedJson = JSON.stringify(JSON.parse(rawJson), null, 2);

  const expectedOutputs = [
    ['stylish', expectedStylish],
    ['plain', expectedPlain],
    ['json', expectedJson],
  ];
  const sameTypeFiles = [['json', json1, json2], ['yaml', yaml1, yaml2]];
  const differentTypeFiles = [['"yaml" and "json"', yaml1, json2]];

  describe.each(expectedOutputs)('Testing %p output format.', (formatterName, expected) => {
    test.each(sameTypeFiles)('Comparing files of %p type.', (type, file1, file2) => {
      expect(gendiff(file1, file2, formatterName)).toEqual(expected);
    });

    test.each(differentTypeFiles)('Comparing %s files.', (type, file1, file2) => {
      expect(gendiff(file1, file2, formatterName)).toEqual(expected);
    });
  });
});

describe('Corner cases.', () => {
  test('Comparing files with the same content.', () => {
    const expectedSame = readFile('expected.same');

    expect(gendiff(json1, yaml1)).toEqual(expectedSame);
  });

  test('Comparing with an empty file.', () => {
    const emptyFile1 = getFixturePath('empty.json');
    const emptyFile2 = getFixturePath('empty.yml');

    const expectedEmpty = readFile('expected.empty');

    expect(gendiff(emptyFile1, json1)).toEqual(expectedEmpty);
    expect(gendiff(emptyFile2, yaml1)).toEqual(expectedEmpty);
  });
});

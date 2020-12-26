import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import gendiff from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const json1 = getFixturePath('1.json');
const json2 = getFixturePath('2.json');
const yaml1 = getFixturePath('1.yaml');
const yaml2 = getFixturePath('2.yaml');

describe('Standard cases.', () => {
  const expectedStylish = readFile('expected.stylish').trimEnd();

  test('Comparing files of same type.', () => {
    expect(gendiff(json1, json2)).toEqual(expectedStylish);
    expect(gendiff(yaml1, yaml2)).toEqual(expectedStylish);
  });

  test('Comparing files of different types.', () => {
    expect(gendiff(yaml1, json2)).toEqual(expectedStylish);
  });

  test('Testing "plain" output format.', () => {
    const expectedPlain = readFile('expected.plain').trimEnd();

    expect(gendiff(yaml1, json2, 'plain')).toEqual(expectedPlain);
  });

  test('Testing "json" output format.', () => {
    const rawData = readFile('expected.json').trimEnd();
    const expectedJson = JSON.stringify(JSON.parse(rawData));

    expect(gendiff(yaml1, json2, 'json')).toEqual(expectedJson);
  });
});

describe('Corner cases.', () => {
  test('Comparing files with same contents.', () => {
    const expectedSame = readFile('expected.same').trimEnd();

    expect(gendiff(json1, yaml1)).toEqual(expectedSame);
  });

  test('Comparing with empty file.', () => {
    const emptyFile1 = getFixturePath('empty.json');
    const emptyFile2 = getFixturePath('empty.yml');

    const expectedEmpty = readFile('expected.empty').trimEnd();

    expect(gendiff(emptyFile1, json1)).toEqual(expectedEmpty);
    expect(gendiff(emptyFile2, yaml1)).toEqual(expectedEmpty);
  });
});

describe('Processing not valid args.', () => {
  test('Not valid file paths.', () => {
    expect(gendiff('', yaml2)).toBeNull();
    expect(gendiff(json2, 3)).toBeNull();
    expect(gendiff(null, yaml1)).toBeNull();
    expect(gendiff(json1, undefined)).toBeNull();
  });

  test('Non-existent paths.', () => {
    const wrongPath1 = getFixturePath('35.json');
    const wrongPath2 = getFixturePath('36.yaml');

    expect(gendiff(json1, wrongPath1)).toBeNull();
    expect(gendiff(wrongPath2, yaml2)).toBeNull();
    expect(gendiff(wrongPath1, wrongPath2)).toBeNull();
  });

  test('Directory paths instead of file paths.', () => {
    expect(gendiff('.', json1)).toBeNull();
    expect(gendiff(json2, '..')).toBeNull();
    expect(gendiff('./bin', yaml1)).toBeNull();
  });

  test('Unsupported files.', () => {
    const unsupportedFile1 = getFixturePath('unsupp.abc');
    const unsupportedFile2 = getFixturePath('unsupp.');
    const unsupportedFile3 = getFixturePath('unsupp');

    expect(gendiff(json1, unsupportedFile1)).toBeNull();
    expect(gendiff(json2, unsupportedFile2)).toBeNull();
    expect(gendiff(unsupportedFile3, yaml1)).toBeNull();
  });
});

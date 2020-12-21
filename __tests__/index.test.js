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
  const diff = readFile('diff.txt').trimEnd();

  test('Comparing files of same type.', () => {
    expect(gendiff(json1, json2)).toEqual(diff);
    expect(gendiff(yaml1, yaml2)).toEqual(diff);
  });

  test('Comparing files of different types.', () => {
    expect(gendiff(yaml1, json2)).toEqual(diff);
  });

  test('Testing "plain" output format.', () => {
    const diffPlain = readFile('diff_plain.txt').trimEnd();

    expect(gendiff(yaml1, json2, 'plain')).toEqual(diffPlain);
  });

  test('Testing "json" output format.', () => {
    const diffJson = readFile('diff.json').trimEnd();
    const expected = JSON.stringify(JSON.parse(diffJson));

    expect(gendiff(yaml1, json2, 'json')).toEqual(expected);
  });
});

describe('Corner cases.', () => {
  test('Comparing files with same contents.', () => {
    const diffSame = readFile('diff_same.txt').trimEnd();

    expect(gendiff(json1, yaml1)).toEqual(diffSame);
  });

  test('Comparing with empty file.', () => {
    const emptyFile1 = getFixturePath('empty.json');
    const emptyFile2 = getFixturePath('empty.yml');

    const diffEmpty = readFile('diff_empty.txt').trimEnd();

    expect(gendiff(emptyFile1, json1)).toEqual(diffEmpty);
    expect(gendiff(emptyFile2, yaml1)).toEqual(diffEmpty);
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
    const wrongPath2 = getFixturePath('35.json');

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

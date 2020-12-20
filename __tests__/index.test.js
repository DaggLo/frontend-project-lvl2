import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import gendiff from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const flatJson1 = getFixturePath('flat/1.json');
const flatJson2 = getFixturePath('flat/2.json');
const flatYaml1 = getFixturePath('flat/1.yml');
const flatYaml2 = getFixturePath('flat/2.yml');

describe('Standard cases.', () => {
  const nestedJson1 = getFixturePath('nested/1.json');
  const nestedJson2 = getFixturePath('nested/2.json');
  const nestedYaml1 = getFixturePath('nested/1.yaml');
  const nestedYaml2 = getFixturePath('nested/2.yaml');

  const flatDiff = readFile('flat/diff.txt').trimEnd();
  const nestedDiff = readFile('nested/diff.txt').trimEnd();

  test('Comparing files of same type.', () => {
    expect(gendiff(flatJson1, flatJson2)).toEqual(flatDiff);
    expect(gendiff(flatYaml1, flatYaml2)).toEqual(flatDiff);
    expect(gendiff(nestedJson1, nestedJson2)).toEqual(nestedDiff);
    expect(gendiff(nestedYaml1, nestedYaml2)).toEqual(nestedDiff);
  });

  test('Comparing files of different types.', () => {
    expect(gendiff(flatJson1, flatYaml2)).toEqual(flatDiff);
    expect(gendiff(nestedYaml1, nestedJson2)).toEqual(nestedDiff);
  });

  test('Testing "plain" output format.', () => {
    const flatDiffPlain = readFile('flat/diff_plain.txt').trimEnd();
    const nestedDiffPlain = readFile('nested/diff_plain.txt').trimEnd();

    expect(gendiff(flatJson1, flatYaml2, 'plain')).toEqual(flatDiffPlain);
    expect(gendiff(nestedYaml1, nestedJson2, 'plain')).toEqual(nestedDiffPlain);
  });

  test('Testing "json" output format.', () => {
    const flatDiffJson = readFile('flat/diff.json').trimEnd();
    const nestedDiffJson = readFile('nested/diff.json').trimEnd();

    const expected1 = JSON.stringify(JSON.parse(flatDiffJson));
    const expected2 = JSON.stringify(JSON.parse(nestedDiffJson));

    expect(gendiff(flatJson1, flatYaml2, 'json')).toEqual(expected1);
    expect(gendiff(nestedYaml1, nestedJson2, 'json')).toEqual(expected2);
  });
});

describe('Corner cases.', () => {
  test('Comparing files with same contents.', () => {
    const expected = [
      '{',
      '    follow: false',
      '    host: hexlet.io',
      '    proxy: 123.234.53.22',
      '    timeout: 50',
      '}',
    ].join('\n');

    expect(gendiff(flatJson1, flatYaml1)).toEqual(expected);
  });

  test('Comparing with empty file.', () => {
    const emptyFile1 = getFixturePath('empty.json');
    const emptyFile2 = getFixturePath('empty.yml');

    const expected = [
      '{',
      '  + host: hexlet.io',
      '  + timeout: 20',
      '  + verbose: true',
      '}',
    ].join('\n');

    expect(gendiff(emptyFile1, flatJson2)).toEqual(expected);
    expect(gendiff(emptyFile2, flatYaml2)).toEqual(expected);
  });
});

describe('Processing not valid args.', () => {
  test('Not valid file paths.', () => {
    expect(gendiff('', flatYaml2)).toBeNull();
    expect(gendiff(flatJson2, 3)).toBeNull();
    expect(gendiff(null, flatYaml1)).toBeNull();
    expect(gendiff(flatYaml1, undefined)).toBeNull();
  });

  test('Non-existent paths.', () => {
    const wrongPath1 = getFixturePath('flat3.json');
    const wrongPath2 = getFixturePath('flat3.yml');

    expect(gendiff(flatJson1, wrongPath1)).toBeNull();
    expect(gendiff(wrongPath1, wrongPath2)).toBeNull();
  });

  test('Directory paths instead of file paths.', () => {
    expect(gendiff('.', flatJson1)).toBeNull();
    expect(gendiff(flatJson2, '..')).toBeNull();
    expect(gendiff('./bin', flatYaml1)).toBeNull();
  });

  test('Unsupported files.', () => {
    const unsupportedFile1 = getFixturePath('unsupp.abc');
    const unsupportedFile2 = getFixturePath('unsupp.');
    const unsupportedFile3 = getFixturePath('unsupp');

    expect(gendiff(flatJson1, unsupportedFile1)).toBeNull();
    expect(gendiff(flatJson1, unsupportedFile2)).toBeNull();
    expect(gendiff(flatJson1, unsupportedFile3)).toBeNull();
  });
});

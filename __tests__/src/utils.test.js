import path from 'path';
import { fileURLToPath } from 'url';
import { isSupportedFileExtension, isValidFilePath, makeTag } from '../../src/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__', filename);

const path1 = getFixturePath('flat1.json');
const path2 = getFixturePath('flat2.json');
const path3 = getFixturePath('flat1.yml');
const path4 = getFixturePath('flat2.yml');

describe('Making tags.', () => {
  test('Should work.', () => {
    const actual1 = makeTag(path1);
    const actual2 = makeTag(path3);

    expect(actual1).toEqual('json');
    expect(actual2).toEqual('yml');
  });
});

describe('Paths validation.', () => {
  test('Valid paths.', () => {
    const actual1 = isValidFilePath(path1);
    const actual2 = isValidFilePath(path2);
    const actual3 = isValidFilePath(path3);
    const actual4 = isValidFilePath(path4);

    expect(actual1).toBe(true);
    expect(actual2).toBe(true);
    expect(actual3).toBe(true);
    expect(actual4).toBe(true);
  });

  test('Not valid paths.', () => {
    expect(isValidFilePath()).toBe(false);
    expect(isValidFilePath(3)).toBe(false);
    expect(isValidFilePath(null)).toBe(false);
    expect(isValidFilePath(undefined)).toBe(false);
    expect(isValidFilePath('')).toBe(false);
    expect(isValidFilePath('hehehe')).toBe(false);
    expect(isValidFilePath('.')).toBe(false);
    expect(isValidFilePath('..')).toBe(false);

    const wrongPath1 = getFixturePath('flat3.json');
    const wrongPath2 = getFixturePath('flat3.yml');

    expect(isValidFilePath(wrongPath1)).toBe(false);
    expect(isValidFilePath(wrongPath2)).toBe(false);
  });
});

describe('Extentions validation.', () => {
  test('Valid extentions.', () => {
    const actual1 = isSupportedFileExtension(path1);
    const actual2 = isSupportedFileExtension(path2);
    const actual3 = isSupportedFileExtension(path3);
    const actual4 = isSupportedFileExtension(path4);

    expect(actual1).toBe(true);
    expect(actual2).toBe(true);
    expect(actual3).toBe(true);
    expect(actual4).toBe(true);
  });

  test('Not valid extentions.', () => {
    const unsupportedFilePath = getFixturePath('unsupp.abc');
    const actual = isSupportedFileExtension(unsupportedFilePath);

    expect(actual).toBe(false);
  });
});

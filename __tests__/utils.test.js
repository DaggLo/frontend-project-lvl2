import path from 'path';
import { fileURLToPath } from 'url';
import { getData, isValidFilePath } from '../src/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Getting data.', () => {
  test('Flat JSON', () => {
    const actual1 = getData(__dirname, '../__fixtures__/flat1.json');
    const actual2 = getData(__dirname, '../__fixtures__/flat2.json');
    // console.log(typeof actual1);
    const expected1 = '{\n  "host": "hexlet.io",\n  "timeout": 50,\n  "proxy": "123.234.53.22",\n  "follow": false\n}\n';
    const expected2 = '{\n  "timeout": 20,\n  "verbose": true,\n  "host": "hexlet.io"\n}\n';

    expect(actual1).toEqual(expected1);
    expect(actual2).toEqual(expected2);
  });
});

describe('Paths validation.', () => {
  test('Valid paths.', () => {
    const path1 = getFixturePath('flat1.json');
    const path2 = getFixturePath('flat2.json');
    const actual1 = isValidFilePath(path1);
    const actual2 = isValidFilePath(path2);

    expect(actual1).toBe(true);
    expect(actual2).toBe(true);
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
  });
});

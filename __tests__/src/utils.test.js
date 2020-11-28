import path from 'path';
import { fileURLToPath } from 'url';
import isValidFilePath from '../../src/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__', filename);

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

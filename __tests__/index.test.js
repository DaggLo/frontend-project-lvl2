import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Test overall package operability.', () => {
  describe('Standard cases.', () => {
    test('Comparing two JSON files.', () => {
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

      expect(actual).toEqual(expected);
    });
  });

  describe('Corner cases.', () => {
    test('Incorrect paths', () => {
      const path1 = getFixturePath('flat1.json');
      const path2 = getFixturePath('flat2.json');

      expect(gendiff()).toBeNull();
      expect(gendiff(path1)).toBeNull();
      expect(gendiff(path2)).toBeNull();
      expect(gendiff(path1, path2, 'something')).toBeNull();
      expect(gendiff(path1, '.')).toBeNull();
    });
  });
});

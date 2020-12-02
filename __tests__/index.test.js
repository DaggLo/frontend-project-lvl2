import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Test overall package operability.', () => {
  const path1 = getFixturePath('flat1.json');
  const path2 = getFixturePath('flat2.json');
  const path3 = getFixturePath('flat1.yml');
  const path4 = getFixturePath('flat2.yml');

  describe('Standard cases.', () => {
    test('Comparing two JSON files.', () => {
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

    test('Comparing two YAML files.', () => {
      const actual = gendiff(path3, path4);
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

    test('Comparing one JSON and one YAML files.', () => {
      const actual = gendiff(path1, path4);
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
    test('Comparing files with the same contents.', () => {
      const actual1 = gendiff(path1, path3);
      const actual2 = gendiff(path2, path4);

      const expected1 = [
        '{',
        '    follow: false',
        '    host: hexlet.io',
        '    proxy: 123.234.53.22',
        '    timeout: 50',
        '}',
      ].join('\n');
      const expected2 = [
        '{',
        '    host: hexlet.io',
        '    timeout: 20',
        '    verbose: true',
        '}',
      ].join('\n');

      expect(actual1).toEqual(expected1);
      expect(actual2).toEqual(expected2);
    });

    test('Invalid args.', () => {
      expect(gendiff('', path4)).toBeNull();
      expect(gendiff(path2, 3)).toBeNull();
      expect(gendiff(null, path3)).toBeNull();
      expect(gendiff(path1, '.')).toBeNull();
      expect(gendiff(path1, '..')).toBeNull();
    });

    test('Too many or little of args.', () => {
      expect(gendiff()).toBeNull();
      expect(gendiff(path1)).toBeNull();
      expect(gendiff(path1, path2, 'something')).toBeNull();
    });

    test('Non-existent paths.', () => {
      const wrongPath1 = getFixturePath('flat3.json');
      const wrongPath2 = getFixturePath('flat3.yml');

      expect(gendiff(path1, wrongPath1)).toBeNull();
      expect(gendiff(wrongPath1, wrongPath2)).toBeNull();
    });

    test('Unsupported file extensions.', () => {
      const unsupportedFile = getFixturePath('unsupp.abc');

      expect(gendiff(path1, unsupportedFile)).toBeNull();
    });
  });
});

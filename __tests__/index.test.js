import path from 'path';
import { fileURLToPath } from 'url';
import gendiff, { getParsedData } from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Getting parsed data.', () => {
  describe('Flat JSON', () => {
    const path1 = getFixturePath('flat1.json');
    const path2 = getFixturePath('flat2.json');
    const actual1 = getParsedData(path1);
    const actual2 = getParsedData(path2);

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

    test('should work #1', () => {
      expect(actual1).toEqual(expected1);
    });
    test('should work #2', () => {
      expect(actual2).toEqual(expected2);
    });
  });
});

describe('Overall flow.', () => {
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

  test('should work', () => {
    expect(actual).toEqual(expected);
  });
});

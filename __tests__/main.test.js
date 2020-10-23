import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDiffString } from '../src/main';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('should work', () => {
  const data1 = JSON.parse(readFile('flat1.json'));
  const data2 = JSON.parse(readFile('flat2.json'));

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

  expect(generateDiffString(data1, data2)).toEqual(expected);
});

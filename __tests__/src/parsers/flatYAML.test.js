import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import parse from '../../../src/parsers/flatYAML.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '../../..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

describe('Parsing data.', () => {
  const data1 = readFile('flat1.yml');
  const data2 = readFile('flat2.yml');

  test('Should work.', () => {
    const actual1 = parse(data1);
    const actual2 = parse(data2);
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

    expect(actual1).toEqual(expected1);
    expect(actual2).toEqual(expected2);
  });
});

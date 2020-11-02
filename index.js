import fs from 'fs';
import path from 'path';
import process from 'process';

import { generateDiff, parse, toFormatedString } from './src/flatJSON.js';

const getParsedData = (filePath) => {
  const __dirname = process.cwd();
  const actualPath = path.resolve(__dirname, filePath);
  const data = fs.readFileSync(actualPath, 'utf8');
  return parse(data);
};

export default (filePath1, filePath2) => {
  const diff = generateDiff(getParsedData(filePath1), getParsedData(filePath2));
  return toFormatedString(diff);
};

export { getParsedData };

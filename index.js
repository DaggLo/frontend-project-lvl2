import fs from 'fs';
import path from 'path';
import process from 'process';

import { generateDiff, parse, toFormatedString } from './src/flatJSON.js';
import { isValidFilePath, getData } from './src/utils.js';

const getParsedData = (filePath) => {
  const __dirname = process.cwd();
  const actualPath = path.resolve(__dirname, filePath);
  const data = fs.readFileSync(actualPath, 'utf8');
  return parse(data);
};
export default (...theArgs) => {
  const [filePath1, filePath2] = theArgs;
  if (theArgs.length !== 2 || !theArgs.every(isValidFilePath)) {
    console.log('There are more or less than two arguments provided or they are invalid.');
    return null;
  }

  const diff = generateDiff(getParsedData(filePath1), getParsedData(filePath2));
  return toFormatedString(diff);
};

export { getParsedData };

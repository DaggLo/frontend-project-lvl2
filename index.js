import process from 'process';

import parse from './src/parsers/flatJSON.js';
import { generateDiff, getData, toFormatedString } from './src/main.js';
import isValidFilePath from './src/utils.js';

const __dirname = process.cwd();

export default (...theArgs) => {
  const [filePath1, filePath2] = theArgs;
  if (theArgs.length !== 2 || !theArgs.every(isValidFilePath)) {
    console.log('There are more or less than two arguments provided or they are invalid.');
    return null;
  }

  const data1 = getData(__dirname, filePath1);
  const data2 = getData(__dirname, filePath2);
  const diff = generateDiff(parse(data1), parse(data2));
  return toFormatedString(diff);
};

import process from 'process';

import parse from './src/parsers/flatJSON.js';
import {
  generateDiff,
  getData,
  isValidArgs,
  toFormatedString,
} from './src/main.js';

const __dirname = process.cwd();

export default (...theArgs) => {
  if (!isValidArgs(theArgs)) {
    console.log('There are more or less than two arguments provided or they are invalid.');
    return null;
  }

  const [filePath1, filePath2] = theArgs;
  const data1 = getData(__dirname, filePath1);
  const data2 = getData(__dirname, filePath2);
  const diff = generateDiff(parse(data1), parse(data2));
  return toFormatedString(diff);
};

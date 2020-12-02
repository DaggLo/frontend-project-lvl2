import process from 'process';

import {
  generateDiff, getData, isValidArgs, parse, tagData, toFormatedString,
} from './src/main.js';

const __dirname = process.cwd();

export default (...theArgs) => {
  if (!isValidArgs(...theArgs)) {
    console.log('Please, provide correct arguments.');
    return null;
  }

  const [filePath1, filePath2] = theArgs;
  const data1 = tagData(getData(__dirname, filePath1), filePath1);
  const data2 = tagData(getData(__dirname, filePath2), filePath2);
  const diff = generateDiff(parse(data1), parse(data2));
  return toFormatedString(diff);
};

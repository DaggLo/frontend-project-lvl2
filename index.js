import process from 'process';

import {
  makeDiffTree, getData, isValidArgs, parse, tagData, render,
} from './src/main.js';

const __dirname = process.cwd();

export default (filePath1, filePath2, formater = 'stylish') => {
  if (!isValidArgs(filePath1, filePath2)) {
    console.log('Please, provide correct arguments.');
    return null;
  }

  const data1 = tagData(getData(__dirname, filePath1), filePath1);
  const data2 = tagData(getData(__dirname, filePath2), filePath2);
  const diff = makeDiffTree(parse(data1), parse(data2));
  return render(diff, formater);
};

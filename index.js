import process from 'process';

import tagData from './src/tags.js';
import isValidArgs from './src/validater.js';
import {
  makeDiffTree, readData, parse, render,
} from './src/main.js';

const __dirname = process.cwd();

export default (filePath1, filePath2, formater = 'stylish') => {
  if (!isValidArgs(filePath1, filePath2)) {
    console.log('Please, provide correct arguments.');
    return null;
  }

  const data1 = tagData(readData(__dirname, filePath1), filePath1);
  const data2 = tagData(readData(__dirname, filePath2), filePath2);
  const diff = makeDiffTree(parse(data1), parse(data2));
  return render(diff, formater);
};

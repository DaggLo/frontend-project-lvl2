import process from 'process';

import tagData from './src/tags.js';
import {
  makeDiffTree, readData, parseData, renderDiffTree,
} from './src/main.js';

const __dirname = process.cwd();

export default (filePath1, filePath2, formatterName = 'stylish') => {
  const data1 = tagData(readData(__dirname, filePath1), filePath1);
  const data2 = tagData(readData(__dirname, filePath2), filePath2);
  const diff = makeDiffTree(parseData(data1), parseData(data2));
  return renderDiffTree(diff, formatterName);
};

import fs from 'fs';

import tagData from './src/tags.js';
import {
  makeDiffTree, parseData, renderDiffTree,
} from './src/main.js';

const readData = (filePath) => fs.readFileSync(filePath, 'utf8');

export default (filePath1, filePath2, formatterName = 'stylish') => {
  const data1 = tagData(readData(filePath1), filePath1);
  const data2 = tagData(readData(filePath2), filePath2);
  const diff = makeDiffTree(parseData(data1), parseData(data2));
  return renderDiffTree(diff, formatterName);
};

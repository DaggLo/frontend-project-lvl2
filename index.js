import fs from 'fs';
import path from 'path';

import tagData from './src/tags.js';
import { makeDiffTree, parse, format } from './src/main.js';

const makeTag = (filePath) => path.extname(filePath).toLowerCase().slice(1);

const readData = (filePath) => fs.readFileSync(filePath, 'utf8');

export default (filePath1, filePath2, outputFormat = 'stylish') => {
  const data1 = tagData(readData(filePath1), makeTag(filePath1));
  const data2 = tagData(readData(filePath2), makeTag(filePath2));
  const diff = makeDiffTree(parse(data1), parse(data2));
  return format(diff, outputFormat);
};

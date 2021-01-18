import fs from 'fs';
import path from 'path';

import makeDiffTree from './src/main.js';
import parse from './src/parsers/index.js';
import format from './src/formatters/index.js';

const getFormat = (filePath) => path.extname(filePath).toLowerCase().slice(1);
const readData = (filePath) => fs.readFileSync(filePath, 'utf8');

const getData = (filePath) => parse(readData(filePath), getFormat(filePath));

export default (filePath1, filePath2, outputFormat = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);
  const diff = makeDiffTree(data1, data2);

  return format(diff, outputFormat);
};

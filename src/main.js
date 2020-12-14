import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import { getTag, getData } from './tags.js';
import formatter from './formatter.js';
import parsers from './parsers.js';
import Node from './classes/Node.js';

const makeDiffTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const ast = keys1.reduce(
    (acc, key) => {
      const { [key]: value1 } = data1;

      if (!keys2.includes(key)) {
        return [...acc, new Node('leaf', key, value1, 'deleted')];
      }

      const { [key]: value2 } = data2;

      if (!_.isPlainObject(value1) || !_.isPlainObject(value2)) {
        return _.isEqual(value1, value2)
          ? [...acc, new Node('leaf', key, value1, 'unchanged')]
          : [...acc, new Node('leaf', key, value1, 'deleted'), new Node('leaf', key, value2, 'added')];
      }

      return [...acc, new Node('internal', key, null, 'unchanged', makeDiffTree(value1, value2))];
    },
    [],
  );

  const completedAst = keys2
    .filter((key) => !keys1.includes(key))
    .reduce((acc, key) => [...acc, new Node('leaf', key, data2[key], 'added')], ast);

  return completedAst;
};

const readData = (dirname, filePath) => {
  const actualPath = path.resolve(dirname, filePath);
  const data = fs.readFileSync(actualPath, 'utf8');
  return data;
};

const parseData = (taggedData) => {
  const tag = getTag(taggedData);
  const data = getData(taggedData);
  const parser = parsers[tag];

  return parser(data);
};

const renderDiffTree = (diffTree, formatterName) => {
  const format = formatter[formatterName];
  return format(diffTree);
};

export {
  makeDiffTree,
  readData,
  parseData,
  renderDiffTree,
};

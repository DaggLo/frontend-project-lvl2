import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import { getTag, getData } from './tags.js';
import formatters from './formatters/index.js';
import parsers from './parsers/index.js';
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
  const formatter = formatters[formatterName];
  const iter = (subTree, level = 0) => [...subTree]
    .sort(
      (a, b) => {
        const aName = a.getName();
        const bName = b.getName();
        return aName.localeCompare(bName, 'en', { sensitivity: 'base' });
      },
    )
    .map(
      (node) => {
        const key = node.getName();
        const value = node.getValue();
        const status = node.getStatus();

        if (node.getType() === 'leaf') {
          return formatter.processLeaf(level, status, key, value);
        }

        const children = node.getChildren();

        return formatter.processInternal(level, status, key, iter(children, level + 1));
      },
    )
    .join('\n');

  return formatter.formatRoot(iter(diffTree));
};

export {
  makeDiffTree,
  readData,
  parseData,
  renderDiffTree,
};

import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import { getTag, getData } from './tags.js';
import formatters from './formatters/index.js';
import parsers from './parsers/index.js';
import makeNode from './node.js';

const makeDiffTree = (data1, data2, pathFromRoot = []) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const diffTree = keys1.reduce(
    (acc, key) => {
      const newPath = [...pathFromRoot, key];
      const { [key]: value1 } = data1;

      if (!keys2.includes(key)) {
        return [...acc, makeNode('leaf', 'deleted', newPath, value1, null)];
      }

      const { [key]: value2 } = data2;

      if (!_.isPlainObject(value1) || !_.isPlainObject(value2)) {
        return _.isEqual(value1, value2)
          ? [...acc, makeNode('leaf', 'unchanged', newPath, value1, value2)]
          : [...acc, makeNode('leaf', 'changed', newPath, value1, value2)];
      }

      return [
        ...acc,
        makeNode('internal', 'unchanged', newPath, null, null, makeDiffTree(value1, value2, newPath)),
      ];
    },
    [],
  );

  const completedDiffTree = keys2
    .filter((key) => !keys1.includes(key))
    .reduce((acc, key) => [...acc, makeNode('leaf', 'added', [...pathFromRoot, key], null, data2[key])], diffTree);

  return completedDiffTree;
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
        const aName = a.getKey();
        const bName = b.getKey();
        return aName.localeCompare(bName, 'en', { sensitivity: 'base' });
      },
    )
    .map(
      (node) => {
        const currentPath = node.getPath();
        const oldValue = node.getOldValue();
        const newValue = node.getNewValue();
        const status = node.getStatus();

        if (node.getType() === 'leaf') {
          return formatter.processLeaf(level, status, currentPath, oldValue, newValue);
        }

        const children = node.getChildren();

        return formatter.processInternal(level, status, currentPath, iter(children, level + 1));
      },
    );

  return formatter.processRoot(iter(diffTree));
};

export {
  makeDiffTree,
  readData,
  parseData,
  renderDiffTree,
};

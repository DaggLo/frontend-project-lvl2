import _ from 'lodash';

import { getTag, getData } from './tags.js';
import formatters from './formatters/index.js';
import parsers from './parsers/index.js';
import makeNode, {
  getType,
  getPath,
  getKey,
  getOldValue,
  getNewValue,
  getStatus,
  getChildren,
} from './node.js';

const makeDiffTree = (data1, data2, pathFromRoot = []) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);

  return keys.map(
    (key) => {
      const newPath = [...pathFromRoot, key];

      if (!_.has(data1, key)) {
        return makeNode('leaf', 'added', newPath, null, data2[key]);
      }

      const { [key]: value1 } = data1;

      if (!_.has(data2, key)) {
        return makeNode('leaf', 'deleted', newPath, value1, null);
      }

      const { [key]: value2 } = data2;

      if (!_.isPlainObject(value1) || !_.isPlainObject(value2)) {
        return _.isEqual(value1, value2)
          ? makeNode('leaf', 'unchanged', newPath, value1, value2)
          : makeNode('leaf', 'changed', newPath, value1, value2);
      }

      return makeNode('internal', 'unchanged', newPath, null, null, makeDiffTree(value1, value2, newPath));
    },
  );
};

const parse = (taggedData) => {
  const tag = getTag(taggedData);
  const data = getData(taggedData);
  const parser = parsers[tag];

  return parser(data);
};

const format = (diffTree, formatterName) => {
  const formatter = formatters[formatterName];
  const iter = (subTree, level = 0) => {
    const sorted = _.sortBy(subTree, [(node) => getKey(node)]);
    return sorted.map(
      (node) => {
        const currentPath = getPath(node);
        const oldValue = getOldValue(node);
        const newValue = getNewValue(node);
        const status = getStatus(node);

        if (getType(node) === 'leaf') {
          return formatter.processLeaf(level, status, currentPath, oldValue, newValue);
        }

        const children = getChildren(node);

        return formatter.processInternal(level, status, currentPath, iter(children, level + 1));
      },
    );
  };

  return formatter.processRoot(iter(diffTree));
};

export {
  makeDiffTree,
  parse,
  format,
};

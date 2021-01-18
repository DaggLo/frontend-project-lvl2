import _ from 'lodash';

import * as stylish from './stylish.js';
import * as plain from './plain.js';
import * as json from './json.js';

import {
  getType,
  getPath,
  getKey,
  getOldValue,
  getNewValue,
  getStatus,
  getChildren,
} from '../node.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default (diffTree, formatterName) => {
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

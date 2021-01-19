import _ from 'lodash';

import makeNode from './node.js';

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

export default makeDiffTree;

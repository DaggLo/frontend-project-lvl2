import _ from 'lodash';

// import makeNode from './node.js';
const makeNode = (type, key, oldValue, newValue, children = []) => (
  {
    type,
    key,
    oldValue,
    newValue,
    children,
  }
);

const makeDiffTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);

  return _.sortBy(keys)
    .map(
      (key) => {
        const { [key]: value1 } = data1;
        const { [key]: value2 } = data2;

        if (!_.has(data1, key)) {
          return makeNode('added', key, null, value2);
        }

        if (!_.has(data2, key)) {
          return makeNode('deleted', key, value1, null);
        }

        if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
          return makeNode('nested', key, null, null, makeDiffTree(value1, value2));
        }

        if (_.isEqual(value1, value2)) {
          return makeNode('unchanged', key, value1, value2);
        }

        return makeNode('changed', key, value1, value2);
      },
    );
};

export default makeDiffTree;

import makeNode from '../node.js';

const processLeaf = (level, status, path, oldValue, newValue) => (
  makeNode('leaf', status, path, oldValue, newValue)
);

const processInternal = (level, status, path, subTree) => (
  makeNode('internal', status, path, null, null, subTree)
);

const processRoot = (outputArr) => JSON.stringify(outputArr);

export {
  processRoot,
  processInternal,
  processLeaf,
};

import Node from '../classes/Node.js';

const processLeaf = (level, status, path, oldValue, newValue) => (
  new Node('leaf', status, path, oldValue, newValue)
);

const processInternal = (level, status, path, subTree) => (
  new Node('internal', status, path, null, null, subTree)
);

const processRoot = (outputArr) => JSON.stringify(outputArr);

export {
  processRoot,
  processInternal,
  processLeaf,
};

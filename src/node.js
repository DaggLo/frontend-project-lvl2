const getType = (node) => node.type;

const getPath = (node) => node.path;

const getKey = (node) => getPath(node).slice(-1).toString();

const getOldValue = (node) => node.oldValue;

const getNewValue = (node) => node.newValue;

const getStatus = (node) => node.status;

const getChildren = (node) => node.children;

export default (type, status, path, oldValue, newValue, children = []) => (
  {
    type,
    path,
    oldValue,
    newValue,
    status,
    children,
  }
);

export {
  getType,
  getPath,
  getKey,
  getOldValue,
  getNewValue,
  getStatus,
  getChildren,
};

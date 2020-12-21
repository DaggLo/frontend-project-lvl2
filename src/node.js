function getType() {
  return this.type;
}

function getPath() {
  return this.path;
}

function getKey() {
  return [...this.getPath()].pop();
}

function getOldValue() {
  return this.oldValue;
}

function getNewValue() {
  return this.newValue;
}

function getStatus() {
  return this.status;
}

function getChildren() {
  return this.children;
}

export default (type, status, path, oldValue, newValue, children = []) => (
  {
    type,
    path,
    oldValue,
    newValue,
    status,
    children,
    getType,
    getPath,
    getKey,
    getOldValue,
    getNewValue,
    getStatus,
    getChildren,
  }
);

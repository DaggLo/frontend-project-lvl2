export default class Node {
  constructor(type, status, pathFromRoot, oldValue, newValue, children = []) {
    this.type = type;
    this.path = pathFromRoot;
    this.oldValue = oldValue;
    this.newValue = newValue;
    this.status = status;
    this.children = children;
  }

  getType() {
    return this.type;
  }

  getPath() {
    return this.path;
  }

  getKey() {
    return [...this.path].pop();
  }

  getOldValue() {
    return this.oldValue;
  }

  getNewValue() {
    return this.newValue;
  }

  getStatus() {
    return this.status;
  }

  getChildren() {
    return this.children;
  }
}

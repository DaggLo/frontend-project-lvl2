export default class Node {
  constructor(type, name, value, status, children = []) {
    this.type = type;
    this.name = name;
    this.value = value;
    this.status = status;
    this.children = children;
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }

  getValue() {
    return this.value;
  }

  getStatus() {
    return this.status;
  }

  getChildren() {
    return this.children;
  }
}

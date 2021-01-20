import _ from 'lodash';

const replacerSymbol = ' ';
const replacerCount = 4;
const padding = ' ';
const signs = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
  nested: ' ',
};

const stringify = (value, level = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) {
      return currentValue;
    }

    const newDepth = depth + 1;
    const margin = replacerSymbol.repeat(newDepth * replacerCount);
    const endMargin = replacerSymbol.repeat(depth * replacerCount);
    const lines = Object
      .entries(currentValue)
      .map(
        ([key, val]) => `${margin}${key}: ${iter(val, newDepth)}`,
      );

    return ['{', ...lines, `${endMargin}}`].join('\n');
  };

  return iter(value, level);
};

const formatStylish = (diffTree) => {
  const iter = (subTree, level = 0) => subTree
    .flatMap(
      (node) => {
        const {
          key, oldValue, newValue, type, children,
        } = node;
        const nextLevel = level + 1;
        const margin = `  ${replacerSymbol.repeat(level * replacerCount)}`;
        const endMargin = replacerSymbol.repeat(nextLevel * replacerCount);

        switch (type) {
          case 'unchanged':
          case 'deleted':
            return `${margin}${signs[type]}${padding}${key}: ${stringify(oldValue, nextLevel)}`;

          case 'added':
            return `${margin}${signs[type]}${padding}${key}: ${stringify(newValue, nextLevel)}`;

          case 'changed':
            return [
              `${margin}${signs.deleted}${padding}${key}: ${stringify(oldValue, nextLevel)}`,
              `${margin}${signs.added}${padding}${key}: ${stringify(newValue, nextLevel)}`,
            ];

          case 'nested':
            return [
              `${margin}${signs[type]}${padding}${key}: {`,
              ...iter(children, nextLevel),
              `${endMargin}}`,
            ];

          default:
            throw new Error(`Unknown node type - ${type}.`);
        }
      },
    );

  const strings = iter(diffTree);

  return ['{', ...strings, '}'];
};

export default (data) => formatStylish(data).join('\n');

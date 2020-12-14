import _ from 'lodash';
import Node from '../classes/Node.js';

export default (diffTree) => {
  const padding = ' ';
  const sign = {
    added: '+',
    deleted: '-',
    unchanged: ' ',
  };

  const makeMargin = (level) => `  ${'    '.repeat(level)}`;
  const makePrefix = (node, level) => [makeMargin(level), sign[node.getStatus()], padding, node.getName(), ':'];

  const convertToAsts = (obj) => Object.entries(obj).map(
    ([key, value]) => new Node('leaf', key, value, 'unchanged'),
  );

  const formatNode = (node, level) => {
    const value = node.getValue();
    const prefix = makePrefix(node, level);

    if (!_.isPlainObject(value)) {
      return [...prefix, ` ${value}`.trimEnd()].join('');
    }

    const nextLevel = level + 1;
    const endMargin = makeMargin(nextLevel).slice(0, -2);
    const converted = convertToAsts(value);
    const traversed = converted.map((n) => formatNode(n, nextLevel));

    return [...prefix, ' {\n', traversed.join('\n'), '\n', endMargin, '}'].join('');
  };

  const iter = (current, level = 0) => {
    const endMargin = makeMargin(level).slice(0, -2);
    const sorted = [...current].sort(
      (a, b) => {
        const aName = a.getName();
        const bName = b.getName();
        return aName.localeCompare(bName, 'en', { sensitivity: 'base' });
      },
    );

    const formated = sorted.map(
      (node) => {
        if (node.getType() === 'leaf') {
          return formatNode(node, level);
        }

        const prefix = makePrefix(node, level);
        return [...prefix, ' ', iter(node.getChildren(), level + 1)].join('');
      },
    );

    return ['{', ...formated, `${endMargin}}`].join('\n');
  };

  return iter(diffTree);
};

import _ from 'lodash';

const statuses = {
  added: 'added',
  deleted: 'removed',
  changed: 'updated',
};

const stringify = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const formatPlain = (diffTree) => {
  const iter = (subTree, ancestor = []) => subTree
    .flatMap(
      (node) => {
        const {
          key, oldValue, newValue, type, children,
        } = node;
        const path = [...ancestor, key];
        const statusPhrase = `Property '${path.join('.')}' was ${statuses[type]}`;

        switch (type) {
          case 'added':
            return `${statusPhrase} with value: ${stringify(newValue)}`;

          case 'deleted':
            return statusPhrase;

          case 'changed':
            return `${statusPhrase}. From ${stringify(oldValue)} to ${stringify(newValue)}`;

          case 'unchanged':
            return null;

          case 'nested':
            return iter(children, path);

          default:
            throw new Error(`Unknown node type - ${type}.`);
        }
      },
    );

  const strings = iter(diffTree);

  return strings.filter((e) => e);
};

export default (data) => formatPlain(data).join('\n');

import _ from 'lodash';

const statuses = {
  added: 'added',
  deleted: 'removed',
  changed: 'updated',
};

const makePrefix = (status, path) => `Property '${path.join('.')}' was ${statuses[status]}`;
const normallizeValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const formatOutput = (arr) => arr
  .filter((e) => e)
  .join('\n');

const processLeaf = (level, status, path, oldValue, newValue) => {
  const prefix = makePrefix(status, path);

  switch (status) {
    case 'added':
      return `${prefix} with value: ${normallizeValue(newValue)}`;

    case 'changed':
      return `${prefix}. From ${normallizeValue(oldValue)} to ${normallizeValue(newValue)}`;

    case 'deleted':
      return prefix;

    default:
      return '';
  }
};

const processInternal = (level, status, path, subTree) => formatOutput(subTree);

const processRoot = (outputArr) => formatOutput(outputArr);

export {
  processRoot,
  processInternal,
  processLeaf,
};

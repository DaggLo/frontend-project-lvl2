import _ from 'lodash';

const padding = ' ';
const signs = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const makeMargin = (level) => `  ${'    '.repeat(level)}`;
const makePrefix = (level, status, key) => [makeMargin(level), signs[status], padding, key, ':'];

const processLeaf = (level, status, key, value) => {
  const prefix = makePrefix(level, status, key);

  if (!_.isPlainObject(value)) {
    return [...prefix, ` ${value}`.trimEnd()].join('');
  }

  const nextLevel = level + 1;
  const endMargin = makeMargin(nextLevel).slice(0, -2);
  const converted = Object.entries(value);
  const traversed = converted.map(
    ([innerKey, innerValue]) => processLeaf(nextLevel, 'unchanged', innerKey, innerValue),
  );

  return [...prefix, ' {\n', traversed.join('\n'), '\n', endMargin, '}'].join('');
};

const processInternal = (level, status, key, subTree) => {
  const prefix = makePrefix(level, status, key);
  const nextLevel = level + 1;
  const endMargin = makeMargin(nextLevel).slice(0, -2);

  return [...prefix, ' {\n', subTree, '\n', endMargin, '}'].join('');
};

const formatRoot = (outputStr) => ['{', outputStr, '}'].join('\n');

export {
  formatRoot,
  processInternal,
  processLeaf,
};

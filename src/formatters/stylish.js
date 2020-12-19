import _ from 'lodash';

const padding = ' ';
const signs = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const makeMargin = (level) => `  ${'    '.repeat(level)}`;
const makePrefix = (level, status, key) => [makeMargin(level), signs[status], padding, key, ':'].join('');

const processLeaf = (level, status, path, oldValue, newValue) => {
  if (status === 'changed') {
    return [
      processLeaf(level, 'deleted', path, oldValue, newValue),
      processLeaf(level, 'added', path, oldValue, newValue),
    ].join('\n');
  }

  const key = [...path].pop();
  const prefix = makePrefix(level, status, key);
  const value = status === 'added' ? newValue : oldValue;

  if (!_.isPlainObject(value)) {
    return [...prefix, ` ${value}`.trimEnd()].join('');
  }

  const nextLevel = level + 1;
  const endMargin = makeMargin(nextLevel).slice(0, -2);
  const converted = Object.entries(value);
  const traversed = converted.map(
    ([innerKey, innerValue]) => processLeaf(nextLevel, 'unchanged', [...path, innerKey], innerValue),
  );

  return [...prefix, ' {\n', traversed.join('\n'), '\n', endMargin, '}'].join('');
};

const processInternal = (level, status, path, subTree) => {
  const key = [...path].pop();
  const prefix = makePrefix(level, status, key);
  const nextLevel = level + 1;
  const endMargin = makeMargin(nextLevel).slice(0, -2);
  const stringified = subTree.join('\n');

  return [...prefix, ' {\n', stringified, '\n', endMargin, '}'].join('');
};

const processRoot = (outputArr) => ['{', ...outputArr, '}'].join('\n');

export {
  processRoot,
  processInternal,
  processLeaf,
};

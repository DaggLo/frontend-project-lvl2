const generateDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const union = keys1.reduce(
    (acc, key) => {
      const { [key]: value1 } = data1;
      if (!keys2.includes(key)) return [...acc, ['-', key, value1]];

      const { [key]: value2 } = data2;
      return value1 === value2 ? [...acc, [' ', key, value1]]
        : [...acc, ['-', key, value1], ['+', key, value2]];
    },
    [],
  );
  const completedUnion = keys2
    .filter((key) => !keys1.includes(key))
    .reduce((acc, key) => [...acc, ['+', key, data2[key]]], union);

  return completedUnion;
};

const parse = (data) => JSON.parse(data);

const toFormatedString = (arr) => {
  const margin = '  ';
  const padding = ' ';
  const sorted = [...arr].sort(
    (a, b) => {
      const [, aKey] = a;
      const [, bKey] = b;
      return aKey.localeCompare(bKey, 'en', { sensitivity: 'base' });
    },
  );

  const formated = sorted.map(
    (e) => {
      const [sign, key, value] = e;
      return [margin, sign, padding, key, ': ', value].join('');
    },
  );

  return ['{', ...formated, '}'].join('\n');
};

export {
  generateDiff,
  parse,
  toFormatedString,
};

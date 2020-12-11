import fs from 'fs';
import path from 'path';
import { attach, typeTag, contents } from '@hexlet/tagged-types';
import _ from 'lodash';

import { isSupportedFileExtension, isValidFilePath, makeTag } from './utils.js';
import formaters from './formaters.js';
import parsers from './parsers.js';
import Node from './classes/Node.js';

const makeDiffTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const ast = keys1.reduce(
    (acc, key) => {
      const { [key]: value1 } = data1;

      if (!keys2.includes(key)) {
        return [...acc, new Node('leaf', key, value1, 'deleted')];
      }

      const { [key]: value2 } = data2;

      if (!_.isPlainObject(value1) || !_.isPlainObject(value2)) {
        return _.isEqual(value1, value2)
          ? [...acc, new Node('leaf', key, value1, 'unchanged')]
          : [...acc, new Node('leaf', key, value1, 'deleted'), new Node('leaf', key, value2, 'added')];
      }

      return [...acc, new Node('internal', key, null, 'unchanged', makeDiffTree(value1, value2))];
    },
    [],
  );

  const completedAst = keys2
    .filter((key) => !keys1.includes(key))
    .reduce((acc, key) => [...acc, new Node('leaf', key, data2[key], 'added')], ast);

  return completedAst;
};

const getData = (dirname, filePath) => {
  const actualPath = path.resolve(dirname, filePath);
  const data = fs.readFileSync(actualPath, 'utf8');
  return data;
};

const isValidArgs = (...theArgs) => (
  theArgs.every(isValidFilePath) && theArgs.every(isSupportedFileExtension));

const parse = (taggedData) => {
  const tag = typeTag(taggedData);
  const data = contents(taggedData);
  const parser = parsers[tag];

  return parser(data);
};

const tagData = (data, filePath) => {
  const tag = makeTag(filePath);
  return attach(tag, data);
};

const render = (ast, formater) => {
  const format = formaters[formater];
  return format(ast);
};

export {
  makeDiffTree,
  getData,
  isValidArgs,
  parse,
  tagData,
  render,
};

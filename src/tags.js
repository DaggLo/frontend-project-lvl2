import path from 'path';
import { attach, contents, typeTag } from '@hexlet/tagged-types';

const makeTag = (arg) => {
  const defaultTagName = 'Blank extension';
  const currentExtension = path.extname(arg);
  return currentExtension === ''
    ? defaultTagName
    : currentExtension.toLowerCase();
};

const tagData = (data, filePath) => {
  const tag = makeTag(filePath);
  return attach(tag, data);
};

const getTag = (taggedData) => typeTag(taggedData);

const getData = (taggedData) => contents(taggedData);

export {
  makeTag,
  getTag,
  getData,
  tagData as default,
};

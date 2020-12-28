import path from 'path';

const makeTag = (arg) => {
  const defaultTagName = 'Blank extension';
  const currentExtension = path.extname(arg);
  return currentExtension === ''
    ? defaultTagName
    : currentExtension.toLowerCase();
};

const tagData = (data, filePath) => {
  const tag = makeTag(filePath);
  return { tag, data };
};

const getTag = (taggedData) => taggedData.tag;

const getData = (taggedData) => taggedData.data;

export {
  makeTag,
  getTag,
  getData,
  tagData as default,
};

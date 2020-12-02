import fs from 'fs';
import path from 'path';

import parsers from './parsers.js';

const makeTag = (arg) => path.extname(arg).toLowerCase().slice(1);

const isSupportedFileExtension = (arg) => {
  const extension = makeTag(arg);
  const result = Object.prototype.hasOwnProperty.call(parsers, extension);

  if (!result) {
    console.log(`The .${extension} files are not supported.`);
  }

  return result;
};

const isValidFilePath = (filePath) => {
  if (!filePath || typeof filePath !== 'string') {
    console.log('Paths should be not empty strings.');
    return false;
  }
  if (!fs.existsSync(filePath)) {
    console.log('Paths should exist.');
    return false;
  }
  if (fs.statSync(filePath).isDirectory()) {
    console.log('Directory paths are not supported.');
    return false;
  }
  return true;
};

export { isSupportedFileExtension, isValidFilePath, makeTag };

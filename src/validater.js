import fs from 'fs';

import parsers from './parsers/index.js';
import { makeTag } from './tags.js';

const isSupportedFileExtension = (arg) => {
  const extension = makeTag(arg);
  const result = Object.prototype.hasOwnProperty.call(parsers, extension);

  if (!result) {
    console.log(`${extension} files are not supported.`);
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

export default (...theArgs) => (
  theArgs.every(isValidFilePath) && theArgs.every(isSupportedFileExtension));

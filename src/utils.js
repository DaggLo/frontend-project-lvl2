import fs from 'fs';

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

export default isValidFilePath;

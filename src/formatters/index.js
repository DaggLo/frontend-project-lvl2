import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';
import formatToJson from './json.js';

export default (diffTree, formatterName) => {
  switch (formatterName) {
    case 'stylish':
      return formatToStylish(diffTree);

    case 'plain':
      return formatToPlain(diffTree);

    case 'json':
      return formatToJson(diffTree);

    default:
      throw new Error(`Unknown formatter "${formatterName}".`);
  }
};

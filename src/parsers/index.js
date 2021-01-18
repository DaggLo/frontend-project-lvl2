import parseYAML from './yaml.js';
import parseJSON from './json.js';

export default (data, format) => {
  switch (format) {
    case 'json':
      return parseJSON(data);

    case 'yml':
    case 'yaml':
      return parseYAML(data);

    default:
      throw new Error(`Unexpected file format ".${format}"`);
  }
};

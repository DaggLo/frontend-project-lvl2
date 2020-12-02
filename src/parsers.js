import parseYAML from './parsers/yaml.js';
import parseJSON from './parsers/json.js';

export default {
  json: parseJSON,
  yml: parseYAML,
  yaml: parseYAML,
};

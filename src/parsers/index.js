import parseYAML from './yaml.js';
import parseJSON from './json.js';

export default {
  json: parseJSON,
  yml: parseYAML,
  yaml: parseYAML,
};

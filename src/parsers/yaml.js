import parseYaml from 'js-yaml';

export default (data) => parseYaml.load(data);

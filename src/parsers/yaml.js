import parseYaml from 'js-yaml';

export default (data) => parseYaml.safeLoad(data);

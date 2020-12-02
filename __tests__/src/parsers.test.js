import parseYAML from '../../src/parsers/yaml.js';
import parseJSON from '../../src/parsers/json.js';
import parsers from '../../src/parsers.js';

describe('Picking up parser.', () => {
  test('Should work.', () => {
    const actual1 = parsers.json;
    const actual2 = parsers.yml;
    const actual3 = parsers.yaml;

    const expected1 = parseJSON;
    const expected2 = parseYAML;
    const expected3 = parseYAML;

    expect(actual1).toEqual(expected1);
    expect(actual2).toEqual(expected2);
    expect(actual3).toEqual(expected3);
  });
});

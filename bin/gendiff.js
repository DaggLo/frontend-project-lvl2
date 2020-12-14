#!/usr/bin/env node

// Alternative variant
// #!/usr/bin/env -vS node --experimental-vm-modules
// https://www.gnu.org/software/coreutils/manual/html_node/
// env-invocation.html#g_t_002dS_002f_002d_002dsplit_002dstring-usage-in-scripts

import program from 'commander';
// import * as packageConfig from '../package.json';
import gendiff from '../index.js';

// const { version } = packageConfig;
program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false);

program
  .version('0.1.0')
  // .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    // console.log(firstConfig, secondConfig, options);
    const formatterName = options.format;
    const result = gendiff(firstConfig, secondConfig, formatterName);
    console.log(result);
  });

program.parse(process.argv);

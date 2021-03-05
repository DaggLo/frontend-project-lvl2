#!/usr/bin/env node

// Alternative variant
// #!/usr/bin/env -vS node --experimental-vm-modules
// https://www.gnu.org/software/coreutils/manual/html_node/
// env-invocation.html#g_t_002dS_002f_002d_002dsplit_002dstring-usage-in-scripts

import program from 'commander';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import gendiff from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = path.join(__dirname, '..', 'package.json');
const packageConfig = fs.readFileSync(__filename, 'utf8');
const { version } = JSON.parse(packageConfig);

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    const formatName = options.format;
    const result = gendiff(firstConfig, secondConfig, formatName);
    console.log(result);
  });

program.parse(process.argv);

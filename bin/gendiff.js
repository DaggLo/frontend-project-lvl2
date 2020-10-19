#!/usr/bin/env node

import program from 'commander';
import { version } from '../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  /* .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, cmdObj) => {
    console.log(firstConfig);
    console.log(secondConfig);
    console.log(cmdObj.format ? cmdObj.format : 'no options passed');
  }) */;

program.parse(process.argv);

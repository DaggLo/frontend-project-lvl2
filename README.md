# The GenDiff (practice package).

[![Node CI](https://github.com/DaggLo/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/DaggLo/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/38127cb38a1582e550d4/maintainability)](https://codeclimate.com/github/DaggLo/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/38127cb38a1582e550d4/test_coverage)](https://codeclimate.com/github/DaggLo/frontend-project-lvl2/test_coverage)

This is my second practice project of the [Hexlet.io front-end JS course](https://ru.hexlet.io/professions/frontend/projects/46).
It's main goal was to get experience of clean coding, building full-fledged app architecture and how to setup dev environment.

`gendiff` is a command-line utility which compares two files and shows their difference (diff).

## Requirements
- Node.js
- Make (optional)

Developed and tested on NODE version 15.3.0 and NPM version 7.0.14.

## Installation
While this is a practice package it is not meant to be published into NPM repository. Due to that follow these steps to install:
1. Download this repo.
2. Run inside the downloaded directory: `npm ci`
3. Run `npm link` to install the app globally.

If you have `make` command on you system you may just run `make install` inside the downloaded directory instead of steps 2 and 3 to accomplish the installation.

## Usage
This package may be used as a command-line utility or as a library.

## Using as a library
In order to do this you should firstly install the package into the project you want to use with. Run the following into your project root:
```
npm link gendiff
```

The utility may be imported into your code the trivial way:
```
import gendiff from 'gendiff';
```

and then be used as a normal function:
```
const diff = gendiff(path, anotherPath, formaterName);
```

First two arguments are paths to files you want to compare.

The third argument is optional and should be a string which represents the name of output formatter. The output formatter determines the way the function's output will be looking. List of supported values:

- `stylish` (_default_)
- `plain`
- `json` (_useful for a further transfer_)

The function always returns a string.

## Using as a cli-utility
As a command-line utility `gendiff` may take parameters and/or various optional flags (options). Generally the utility syntax looks like this:
```
gendiff [options] <firstConfig> <secondConfig>
```

`<firstConfig>` and `<secondConfig>` should be paths (absolute or relative) to files you want to compare. You must specify either two file paths or no one. See usage examples for more information.

`[options]` or flags may be used to modify the utility behavior. Each option can have a short flag (single character) and a long name. List of available flags is below:
```
Options:
  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           display help for command
```

### Supported file types.
- `.json`
- `.yaml` and `.yml`

### Supported output formats.
An output format can be specified via special value combined with the `-f` or `--format` option. This value is optional and if no value is provided with the option a default one (`stylish`) is used.

List of supported output formats:
- `stylish` (_default_)
- `plain`
- `json`

### Usage examples
```
gendiff -V
gendiff --help
gendiff temp/file1.json file2.json
gendiff temp/file1.yaml file2.json
gendiff -f plain ../src/1.json /home/user/2.yml
gendiff ../src/1.json /home/user/2.yml -f json
```

<a href="https://asciinema.org/a/DN6I3weZBVjbgVdHYY8MmaKOu" target="_blank"><img src="https://asciinema.org/a/DN6I3weZBVjbgVdHYY8MmaKOu.svg" alt="Ascinema of the usage process" width="200px"/></a>

## License
ISC License

Copyright (c) 2021, Evgeny A. Degtev

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

# The GenDiff (practice package).

[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Build Status](https://travis-ci.org/DaggLo/frontend-project-lvl1.svg?branch=master)](https://travis-ci.org/DaggLo/frontend-project-lvl1)

This is my second practice project of the [Hexlet.io front-end JS course](https://ru.hexlet.io/professions/frontend/projects/46).
It's main goal was to get experience of clean coding, building full-fledged app architecture and how to setup dev environment.

`gendiff` is a command-line utility which compares two files and shows their difference (diff).

## Requirements
- Node.js
- Make (optional)

Developed and tested on NODE version 14.13.1 and NPM version 6.14.8.

## Installation
While this is a practice package it is not meant to be published into NPM repository. Due to that follow these steps to install:
1. Download this repo.
2. Run inside downloaded directory: `npm install` (or `make install` if you have `make`).
3. Run `sudo npm link` to install the app globally.

## Usage
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

### Usage examples
```
gendiff -V
gendiff --help
gendiff temp/file1.json file2.json
gendiff -f ../src/1.txt /home/user/2.txt
```

<a href="https://asciinema.org/a/r7Xyi4JDu6qp5o3rHuEELuaVk" target="_blank"><img src="https://asciinema.org/a/r7Xyi4JDu6qp5o3rHuEELuaVk.svg" alt="Ascinema of the usage process" width="200px"/></a>

## License
ISC License

Copyright (c) 2020, Evgeny A. Degtev

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

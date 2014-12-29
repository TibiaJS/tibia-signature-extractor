#!/usr/bin/env node

var fs  = require('fs')
  , cmd = require('commander')
  , lib = require('../lib/index')
  , pkg = require('../package.json');

cmd
  .version(pkg.version)
  .option('-f, --file <file>', 'specify a file like Tibia.spr or Tibia.dat', '')
  .parse(process.argv);

var file = cmd.file;
if(file) {
  var sign = lib.parse(file);
  if (!sign) {
    cmd.help();
  } else {
    console.log('The ' + sign.type + ' signature is ' + sign.sign);
  }
} else {
  cmd.help();
}

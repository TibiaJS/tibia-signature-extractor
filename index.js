#!/usr/bin/env node

var fs, cmd, file, ext, isSpr, isDat, sign;

fs  = require('fs');
cmd = require('commander');

cmd
  .version('0.0.1')
  .option('-f, --file <file>', 'specify a file like Tibia.spr or Tibia.dat', '-')
  .parse(process.argv);

file = cmd.file;
ext  = (file.length > 5) ? file.substring((file.length - 4), file.length) : '';
isSpr = ext == '.spr';
isDat = ext == '.dat';
if(file && (isDat || isSpr)) {

  fs.readFile(file, function (err, data) {
    if (err) throw err;

    sign = data.readUInt32LE(0).toString(16).toUpperCase();
    console.log(((isSpr) ? 'Sprite' : 'Dat') + ' signature is ' + sign);

  });

} else {
  throw new Error('File not found or Invalid File Format');
}

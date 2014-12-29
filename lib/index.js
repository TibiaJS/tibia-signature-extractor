var fs = require('fs')
, path = require('path');

function abort(str) {
  console.error(str);
  process.exit(1);
}

function getSignature(filename, cb) {
  if(fs.existsSync(filename)) {
    var data = fs.readFileSync(filename);
    return data.readUInt32LE(0).toString(16).toUpperCase();
  } else {
    abort('File ' + path.basename(filename) + ' not found.');
  }
}

module.exports = {
  parse: function(file) {
    if(file) {
      var ext = path.extname(file).toLowerCase();
      if (!(ext === '.spr' || ext === '.dat')) {
        abort('Invalid file format. Only .spr and .dat allowed');
      } else {
        return {type: ext.replace('.', ''), sign: getSignature(file) };
      }
    } else {
      return false;
    }
  }
};

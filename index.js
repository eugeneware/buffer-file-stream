var stream = require('stream'),
    fs = require('fs'),
    sprintf = require('sprintf-js').sprintf;

module.exports = BufferFileStream;

function BufferFileStream(pattern) {
  var ts = stream.Transform();
  var count = 0;
  ts._transform = function (chunk, enc, cb) {
    var fileName = sprintf(pattern, count++);
    fs.writeFile(fileName, chunk, cb);
  };
  return ts;
}

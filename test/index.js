var expect = require('expect.js'),
    stream = require('stream'),
    path = require('path'),
    fs = require('fs'),
    rimraf = require('rm-rf'),
    async = require('async'),
    bufferFileStream = require('..');

describe('buffer-file-stream', function() {
  var tempDir = path.join(__dirname, '..', 'temp');
  beforeEach(function (done) {
    rimraf(path.join(tempDir, '*.*'), done);
  });

  it('should be able to write text buffers to files', function(done) {
    this.timeout(0);

    var bfs = bufferFileStream(path.join(tempDir, 'out-%03d.txt'));
    var rs = stream.Readable();
    rs._read = function () {};

    bfs.on('finish', function (data) {
      var files = ['000', '001'].map(function (item) {
        return path.join(tempDir, 'out-' + item + '.txt');
      });

      async.map(files, fs.readFile, function (err, results) {
        var answer = ['Hello', 'World'];
        var strings = results.map(function (item) {
          return item.toString('utf8');
        });
        expect(answer).to.eql(strings);
        done();
      });
    });

    rs.pipe(bfs);
    rs.push(new Buffer('Hello'));
    rs.push(new Buffer('World'));
    rs.push(null);
  });

  it('should be able to write binary data to files', function(done) {
    this.timeout(0);

    var bfs = bufferFileStream(path.join(tempDir, 'out-%03d.dat'));
    var rs = stream.Readable();
    rs._read = function () {};

    bfs.on('finish', function (data) {
      var files = ['000', '001'].map(function (item) {
        return path.join(tempDir, 'out-' + item + '.dat');
      });

      async.map(files, fs.readFile, function (err, results) {
        var answer = [
          new Buffer([0x12, 0x34, 0x56, 0x78]),
          new Buffer([0x87, 0x65, 0x43, 0x21])
        ];
        expect(answer).to.eql(results);
        done();
      });
    });

    rs.pipe(bfs);
    rs.push(new Buffer([0x12, 0x34, 0x56, 0x78]));
    rs.push(new Buffer([0x87, 0x65, 0x43, 0x21]));
    rs.push(null);
  });
});

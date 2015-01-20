# buffer-file-stream

Write each buffer chunk to an individual file with an incrementing file name.

Useful for dumping an upstream stream to a series of files.

[![build status](https://secure.travis-ci.org/eugeneware/buffer-file-stream.png)](http://travis-ci.org/eugeneware/buffer-file-stream)

## Installation

This module is installed via npm:

``` bash
$ npm install buffer-file-stream
```

## Example Usage

Write all new `Buffer` data chunks to incrementing files:

``` js
var bufferFileStream = require('buffer-file-stream');

// writes all Buffer 'data' chunks to blah-000.txt, blah-001.txt, etc
// uses sprintf syntax for pattern

var bfs = bufferFileStream('/tmp/blah-%03d.txt');

bfs.write('hello');
// creates a text file /tmp/blah-000.txt with the text 'hello'

bfs.write('world');
// creates a text file /tmp/blah-001.txt with the text 'world'
```

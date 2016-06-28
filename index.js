'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var fs = require('fs');
var vinyl = require('vinyl');

// Consts
var PLUGIN_NAME = 'gulp-bower-files-from-html';
var SCRIPT = /<script([^>]*)>\s*<\/script>/gi;
var SRC = /src=['"]([^"']*)['"]/i;
var LINK = /<link([^>]*)>/gi;
var HREF = /href=['"]([^"']*)['"]/i;
var COMMENT = /<!--[^]*?-->/g;
var BOWER = /bower_components/;

// get the paths of all valid bower files
function validateBowerFiles(paths, elements, attr) {
  elements.forEach(function(element) {
    var path = element.match(attr);
    if (path != null && BOWER.test(path[1])) {
      paths.push(path[1]);
    }
  });
}

// deal with html file buffer
function getBowerFiles(contents, file, self) {
  var html = contents.toString();
  // just ignore comments in html
  html = html.replace(COMMENT, '');
  var scripts = html.match(SCRIPT) || [];
  var links = html.match(LINK) || [];
  var paths = [];

  validateBowerFiles(paths, scripts, SRC);
  validateBowerFiles(paths, links, HREF);

  paths.forEach(function(path) {
    path = file.base + path;
    try {
      var stats = fs.statSync(path);
      if (stats.isFile()) {
        var bower_file = new vinyl({
          base: './',
          path: path,
          stat: stats
        });

        if (file.isStream()) {
          bower_file.contents = fs.createReadStream(path);
        }
        if (file.isBuffer()) {
          bower_file.contents = fs.readFileSync(path);
        }
        // make sure the file goes through the next gulp plugin
        self.push(bower_file);
      }
    } catch(err) {
      self.emit('error', new PluginError(PLUGIN_NAME, path + ' is not found!'));
    }
  });
}

// Plugin level function(dealing with files)
function gulpBowerFilesFromHtml() {
  // Creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb();
    }

    if (file.isStream()) {
      var self = this;
      file.contents.on('data', function(chunck) {
        getBowerFiles(chunck, file, self);
        // tell the stream engine that we are done with this file
        cb();
      });
    }

    if (file.isBuffer()) {
      var contents = file.contents;
      getBowerFiles(contents, file, this);
      cb();
    }
  });

  return stream;
}

// Exporting the plugin main function
module.exports = gulpBowerFilesFromHtml;
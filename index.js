'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var fs = require('fs');

// Consts
var PLUGIN_NAME = 'gulp-bower-files-from-html';
var SCRIPT = /<script([^>]*)>\s*<\/script>/gi;
var SRC = /src=['"]([^"']*)['"]/i;
var COMMENT = /<!--[^]*?-->/g;
var BOWER = /bower_components/;
var BOWER_PATH = null;

// get the absolute path of bower components
function getAbsolutePath(path) {
  var dir = 'bower_components';

  if (path) {
    var len = path.length;
    if (path[len - 1] == '/') {
      dir = path.slice(0, -1);
    } else {
      dir = path;
    }
  }

  return __dirname + '/' + dir;
}

// deal with html file buffer
function dealWithFileBuffer(file, self) {
  var html = file.contents.toString();
  // just ignore comments in html
  html = html.replace(COMMENT, '');
  var scripts = html.match(SCRIPT);
  var paths = [];

  scripts.forEach(function(script) {
    var path = script.match(SRC);
    if (path != null && BOWER.test(path[1])) {
      path = path[1].split(BOWER)[1];
      path = BOWER_PATH + path;
      paths.push(path);
    }
  });

  paths.forEach(function(path) {
    try {
      var stats = fs.statSync(path);
      if (stats.isFile()) {
        var bower_file = file.clone();
        bower_file.path = path;
        bower_file.contents = fs.readFileSync(path);
        // make sure the file goes through the next gulp plugin
        self.push(bower_file);
      }
    } catch(err) {
      self.emit('error', new PluginError(PLUGIN_NAME, path + ' is not found!'));
    }
  });
}

// Plugin level function(dealing with files)
function gulpBowerFilesFromHtml(bower_path) {
  BOWER_PATH = getAbsolutePath(bower_path);

  // Creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb();
    }

    if (file.isStream()) {
      var self = this;
      file.contents.on('data', function(chunck) {
        // stream to buffer
        file.contents = chunck;
        dealWithFileBuffer(file, self);
        // tell the stream engine that we are done with this file
        cb();
      });
    }

    if (file.isBuffer()) {
      dealWithFileBuffer(file, this);
      cb();
    }
  });

  return stream;
}

// Exporting the plugin main function
module.exports = gulpBowerFilesFromHtml;
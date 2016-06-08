'use strict';

// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var fs = require('fs');

// Consts
var PLUGIN_NAME = 'gulp-bower-files-from-html';
var script = /<script([^>]*)>\s*<\/script>/gi;
var src = /src=['"]([^"']*)['"]/i;
var bower = /bower_components/;

// find out the absolute path of bower
function dealWithBowerPath(bower_path) {
  var bower_dir = 'bower_components';

  if (bower_path) {
    var len = bower_path.length;
    if (bower_path[len - 1] == '/') {
      bower_dir = bower_path.slice(0, -1);
    } else {
      bower_dir = bower_path;
    }
  }

  return __dirname + '/' + bower_dir;
}

// Plugin level function(dealing with files)
function gulpBowerFilesFromHtml(bower_path) {
  var bower_dir = dealWithBowerPath(bower_path);

  // Creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb();
    }

    if (file.isStream()) {
      console.log('file is stream');
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      console.log('file is buffer');
      var html = file.contents.toString();
      var scripts = html.match(script);
      var paths = [];

      scripts.forEach(function(script) {
        var path = script.match(src);
        if (path != null && bower.test(path[1])) {
          var file_path = path[1].split(bower)[1];
          path = bower_dir + file_path;
          paths.push(path);
        }
      });

      paths.forEach(function(path) {
        var stats = fs.statSync(path);
        if (stats.isFile()) {
          var bower_file = file.clone();
          bower_file.path = path;
          bower_file.contents = fs.readFileSync(path);
          // make sure the file goes through the next gulp plugin
          this.push(bower_file);
        } else {
          this.emit('error', new PluginError(PLUGIN_NAME, path + ' is not found!'));
        }
      }, this);
    }

    // tell the stream engine that we are done with this file
    cb();
  });

  return stream;
}

// Exporting the plugin main function
module.exports = gulpBowerFilesFromHtml;
// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-bower-files-from-html';

// Plugin level function(dealing with files)
function gulpBowerFilesFromHtml() {

  // Creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }

    console.log(file.contents);
    if (file.isBuffer()) {
      // file.contents = Buffer.concat([prefixText, file.contents]);
    }

    if (file.isStream()) {
      // file.contents = file.contents.pipe(prefixStream(prefixText));
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);
    // tell the stream engine that we are done with this file
    cb(null);

  });

  return stream;
}

// Exporting the plugin main function
module.exports = gulpBowerFilesFromHtml;
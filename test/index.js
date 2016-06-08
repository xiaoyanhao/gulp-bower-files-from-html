'use strict';

var gulp = require('gulp');
var assert = require('assert');
var streamAssert = require('stream-assert');
var gulpBowerFilesFromHtml = require('../index.js');

describe('gulp-bower-files-from-html', function() {
  it('is a function', function() {
    assert.equal(typeof gulpBowerFilesFromHtml, 'function');
  });

  describe('from html file', function() {
    it('extract 3 bower files', function() {
      gulp.src('./index.html')
        .pipe(gulpBowerFilesFromHtml())
        .pipe(streamAssert.length(3))
        .pipe(gulp.dest('./dist'))
        .pipe(streamAssert.end());
    });
  });
});
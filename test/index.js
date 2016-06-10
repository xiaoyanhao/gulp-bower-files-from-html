'use strict';

var gulp = require('gulp');
var assert = require('assert');
var streamAssert = require('stream-assert');
var gulpBowerFilesFromHtml = require('../index');

describe('gulp-bower-files-from-html', function() {
  it('is a function', function() {
    assert.equal(typeof gulpBowerFilesFromHtml, 'function');
  });

  describe('without bower relative path', function() {
    it('should ignore when no bower files', function() {
      gulp.src('./html/0.html')
        // .pipe(gulpBowerFilesFromHtml())
        .pipe(streamAssert.length(2))
        .pipe(gulp.dest('./dist'))
        .pipe(streamAssert.end());
    });
  });
});
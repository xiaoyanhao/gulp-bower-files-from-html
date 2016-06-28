'use strict';

var fs = require('fs');
var gulp = require('gulp');
var assert = require('assert');
var streamAssert = require('stream-assert');
var gulpBowerFilesFromHtml = require('../index');


describe('gulp-bower-files-from-html', function() {
  it('is a function', function() {
    assert.equal(typeof gulpBowerFilesFromHtml, 'function');
  });


  describe('in buffer mode', function() {
    it('should ignore when no bower files are used', function(done) {
      gulp.src('./html/0.html', {buffer: true})
        .pipe(gulpBowerFilesFromHtml())
        .pipe(streamAssert.length(0))
        .pipe(streamAssert.end(done));
    });
  });


  describe('in stream mode', function() {
    it('should copy three scripts and one css', function(done) {
      gulp.src('./html/1.html', {buffer: false})
        .pipe(gulpBowerFilesFromHtml())
        .pipe(streamAssert.length(4))
        .pipe(streamAssert.end(done));
    });

    it('should assert error when bower files are not found', function(done) {
      gulp.src('./html/2.html', {buffer: false})
        .pipe(gulpBowerFilesFromHtml())
        .on('error', function(err) {
          assert.ifError(!err);
        })
        .pipe(streamAssert.end(done));
    });
  });
});

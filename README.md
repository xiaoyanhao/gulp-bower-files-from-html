# gulp-bower-files-from-html [![NPM version][npm-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Dependency Status][dependency-img]][dependency-url]
Extract the bower files from the html files according to script and link tags.
## Installation
```
npm install --save-dev gulp-bower-files-from-html
```
## Usage
```js
var gulp = require('gulp');
var gulpBowerFilesFromHtml = require('gulp-bower-files-from-html');

gulp.task('bower', function() {
  return gulp.src('./index.html')
    .pipe(gulpBowerFilesFromHtml())
    .pipe(gulp.dest('./dist'));
});
```
[npm-img]: https://badge.fury.io/js/gulp-bower-files-from-html.svg
[npm-url]: https://www.npmjs.com/package/gulp-bower-files-from-html
[travis-img]: https://travis-ci.org/xiaoyanhao/gulp-bower-files-from-html.svg?branch=master
[travis-url]: https://travis-ci.org/xiaoyanhao/gulp-bower-files-from-html
[dependency-img]: https://david-dm.org/xiaoyanhao/gulp-bower-files-from-html.svg
[dependency-url]: https://david-dm.org/xiaoyanhao/gulp-bower-files-from-html

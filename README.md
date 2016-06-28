# gulp-bower-files-from-html [![Build Status](https://travis-ci.org/xiaoyanhao/gulp-bower-files-from-html.svg?branch=master)](https://travis-ci.org/xiaoyanhao/gulp-bower-files-from-html)
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


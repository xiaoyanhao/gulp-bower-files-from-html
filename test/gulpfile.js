var gulp = require('gulp');
var mocha = require('gulp-mocha');
var streamAssert = require('stream-assert');
// var gulpBowerFilesFromHtml = require('../index');

gulp.task('mocha', function() {
  return gulp.src('./index.js', {read: false})
    .pipe(mocha());
});

gulp.task('watch', function() {
  gulp.watch(['./*', '../index.js'], ['mocha']);
});

gulp.task('default', ['mocha', 'watch']);

// gulp.task('test', function() {
//   return gulp.src('./html/1.html', {buffer: true})
//     .pipe(gulpBowerFilesFromHtml())
//     .pipe(gulp.dest('./dist'));
// });
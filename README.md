# gulp-bower-files-from-html
Extract the bower files from the html files according to script and link tags.

[![NPM version][npm-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Dependency Status][dependency-img]][dependency-url]
## Installation
```
npm install --save-dev gulp-bower-files-from-html
```
## Usage
For example, there is a project:
```
.
|---bower_components
    |---react
        |---react.min.js
        |---react-dom.min.js
        |___...
|---dist 
|---node_modules
|---src
    |---index.html
    |---index.jsx
    |---index.scss
    |___...
|---gulpfile.js
|---package.json
|---bower.json
|___...
```

### Scenario 1

1. compile `ES6` into `ES5`, `scss` into `css` and then put all 'html', 'css' and 'js' files to `dist`(including `src`).
2. copy the bower components that we use to `dist`(That is what the plugin does).

#### src/index.html
```html
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset="UTF-8">
    <title>Example</title>
    <script type="text/javascript" src="../bower_components/react/react.min.js"></script>
    <script type="text/javascript" src="../bower_components/react/react-dom.min.js"></script>
  </head>
  <body>
    <div id="mountNode"></div>
  </body>
</html>
```

#### gulpfile.js
```js
var gulp = require('gulp');
var gulpBowerFilesFromHtml = require('gulp-bower-files-from-html');

gulp.task('bower', function() {
  return gulp.src('./src/index.html')
    .pipe(gulpBowerFilesFromHtml())
    .pipe(gulp.dest('./dist'));
});
```

As a result, the `dist` will look like:
```
|---dist
    |---bower_components
        |---react.min.js
        |___react-dom.min.js
    |---src
        |---index.html
        |---index.js
        |---index.css
        |___...
```

### Scenario 2

1. compile `ES6` into `ES5`, `scss` into `css` and then put all 'html', 'css' and 'js' files to `dist`(excluding `src`).
2. copy the bower components that we use to `dist`(That is what the plugin does).

#### src/index.html
```html
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset="UTF-8">
    <title>Example</title>
    <script type="text/javascript" src="./bower_components/react/react.min.js"></script>
    <script type="text/javascript" src="./bower_components/react/react-dom.min.js"></script>
  </head>
  <body>
    <div id="mountNode"></div>
  </body>
</html>
```

> The path of bower_components should omit `src` level and it should be relative to the html file in `dist`.

#### gulpfile.js
```js
var gulp = require('gulp');
var gulpBowerFilesFromHtml = require('gulp-bower-files-from-html');

gulp.task('bower', function() {
  return gulp.src('./index.html', {base: './'})
    .pipe(gulpBowerFilesFromHtml())
    .pipe(gulp.dest('./dist'));
});
```

> Use option `base` in `gulp.src` to specify the path of bower_components relative to `gulpfile.js`.

As a result, the `dist` will look like:
```
|---dist
    |---bower_components
        |---react.min.js
        |___react-dom.min.js
    |---index.html
    |---index.js
    |---index.css
    |___...
```

### Scenario 3
```js
var gulp = require('gulp');
var gulpBowerFilesFromHtml = require('gulp-bower-files-from-html');

// support multiple html files
gulp.task('bower', function() {
  return gulp.src(['./*.html'], {base: './'})
    .pipe(gulpBowerFilesFromHtml())
    .pipe(gulp.dest('./dist'));
});

// support stream mode
gulp.task('bower', function() {
  return gulp.src(['./*.html'], {base: './', buffer: false})
    .pipe(gulpBowerFilesFromHtml())
    .pipe(gulp.dest('./dist'));
});
```

## Demo
[markdown-editor](https://github.com/xiaoyanhao/markdown-editor)

## License
Under the MIT license. See [LICENSE](https://github.com/xiaoyanhao/gulp-bower-files-from-html/blob/master/LICENSE) file for more details.

[npm-img]: https://badge.fury.io/js/gulp-bower-files-from-html.svg
[npm-url]: https://www.npmjs.com/package/gulp-bower-files-from-html
[travis-img]: https://travis-ci.org/xiaoyanhao/gulp-bower-files-from-html.svg?branch=master
[travis-url]: https://travis-ci.org/xiaoyanhao/gulp-bower-files-from-html
[dependency-img]: https://david-dm.org/xiaoyanhao/gulp-bower-files-from-html.svg
[dependency-url]: https://david-dm.org/xiaoyanhao/gulp-bower-files-from-html

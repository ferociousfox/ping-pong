var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});

//THIS IS WHAT concatInterface LOOKED LIKE BEFORE ADDING * AS A "GLOBAL PATTERN" TO CONCATENATE AND BROWSERIFY ALL FILES IN THE JS FOLDER THAT ENDS WITH STRING
// gulp.task('concatInterface', function() {
//   return gulp.src(['./js/pingpong-interface.js', './js/signup-interface.js'])
//     .pipe(concat('allConcat.js'))
//     .pipe(gulp.dest('./tmp'));
// });

gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

////THIS IS WHAT jsBrowserify LOOKED LIKE BEFORE WE ADDED THE NEW concatInterface function
// gulp.task('jsBrowserify', function() {
//   return browserify({ entries: ['./js/pingpong-interface.js'] })
//     .bundle()
//     .pipe(source('app.js'))
//     .pipe(gulp.dest('./build/js'));
// });

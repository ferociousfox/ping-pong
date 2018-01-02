var del = require('del');
var utilities = require('gulp-util');
var buildProduction = utilities.env.production;
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

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

gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

// we're telling it to delete the entire build and tmp folders. We'll put it right before the build task and call it automatically by making it a dependency of our build task. Whether we're making a production or a development build, we will clean up first.
gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

gulp.task("build", ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});

// a short note on gulp.start. The gulp.start function is undocumented on purpose because it will be deprecated in a future version of gulp. In fact, it is actually inherited from a different framework. However, it is very common to use it in this fashion to trigger tasks based on conditional statements. But developers are encouraged to use dependencies wherever possible (that array of other gulp tasks that run automatically) rather than gulp.start to trigger tasks at the correct time.



// WHAT BUILD FUNCTION LOOKED LIKE BEFORE ADDING CLEAN/DELETE FUNCTION. Each of our tasks have their own dependency chains so all we have to do is specify the top level task that we want to run based on whether we are in development mode or deploying a production build.
// gulp.task("build", function(){
//   if (buildProduction) {
//     gulp.start('minifyScripts');
//   } else {
//     gulp.start('jsBrowserify');
//   }
// });

gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

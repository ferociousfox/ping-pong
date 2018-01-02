var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var buildProduction = utilities.env.production;

var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

var browserSync = require('browser-sync').create();

gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

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

gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

//combine both these 2 Bower tasks into one, since they can run in parallel
gulp.task('bower', ['bowerJS', 'bowerCSS']);

// We're telling it to delete the entire build and tmp folders. We'll put it right before the build task and call it automatically by making it a dependency of our build task. Whether we're making a production or a development build, we will clean up first.
gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

// WHAT BUILD FUNCTION LOOKED LIKE BEFORE ADDING CLEAN/DELETE FUNCTION. Each of our tasks have their own dependency chains so all we have to do is specify the top level task that we want to run based on whether we are in development mode or deploying a production build.
// gulp.task("build", function(){
//   if (buildProduction) {
//     gulp.start('minifyScripts');
//   } else {
//     gulp.start('jsBrowserify');
//   }
// });

// This is what I looked like before adding Bower
// gulp.task("build", ['clean'], function(){
//   if (buildProduction) {
//     gulp.start('minifyScripts');
//   } else {
//     gulp.start('jsBrowserify');
//   }
// });
gulp.task('build', ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

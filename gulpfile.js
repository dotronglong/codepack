require('babel-register');
const gulp   = require('gulp');
const path   = require('path');
const babel  = require('gulp-babel');
const clean  = require('gulp-clean');
const mocha  = require('gulp-mocha');
const concat = require('gulp-concat');
const colors = require('colors');

const handleError = function (error) {
  console.log(error);
  this.emit('error');
};

const main       = 'index.js';
const buildDir   = 'build';
const libDir     = 'lib';
const testDir    = 'test';
const distDir    = 'dist';
const sources    = [path.join(libDir, '**', '*.js')];
const tests      = [path.join(testDir, '**', '*.js')];
const buildTests = tests.map(v => path.join(buildDir, v));
const buildFiles = path.join(buildDir, '**', '*.*');

gulp.task('default', ['build']);

gulp.task('clean', ['clean:lib', 'clean:test']);
gulp.task('clean:lib', function () {
  return gulp.src(path.join(buildDir, libDir), {read: false})
    .pipe(clean());
});
gulp.task('clean:test', function () {
  return gulp.src(path.join(buildDir, testDir), {read: false})
    .pipe(clean());
});

gulp.task('build', ['build:lib', 'build:test']);
gulp.task('build:lib', ['clean:lib'], function () {
  return gulp.src(sources)
    .pipe(babel())
    .pipe(gulp.dest(path.join(buildDir, libDir)))
    .pipe(gulp.dest(path.join(distDir)))
    .pipe(concat(main))
    .pipe(gulp.dest(path.join(__dirname)));
});
gulp.task('build:test', ['clean:test'], function () {
  return gulp.src(tests)
    .pipe(babel())
    .pipe(gulp.dest(path.join(buildDir, testDir)));
});

gulp.task('test', ['build'], function () {
  gulp.src(buildTests)
    .pipe(mocha({
      reporter: 'dot'
    }))
    .on('error', function (e) {
      console.log('[ERROR] '.red + e.message.blue);
      this.emit(e);
    });
});
gulp.task('watch:test', ['test'], function () {
  gulp.watch([].concat(sources, tests), ['test']);
});
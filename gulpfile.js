const gulp   = require('gulp');
const path   = require('path');
const babel  = require('gulp-babel');
const clean  = require('gulp-clean');
const concat = require('gulp-concat');

const main     = 'index.js';
const libDir   = 'lib';
const buildDir = 'build';
const testDir  = 'test';

gulp.task('default', ['build']);

gulp.task('build', function () {
  gulp.src([path.join(libDir, '**', '*.js')])
    .pipe(babel())
    .pipe(concat(main))
    .pipe(gulp.dest(__dirname));
});
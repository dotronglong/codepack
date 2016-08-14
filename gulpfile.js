require('babel-register')
const gulp    = require('gulp')
const path    = require('path')
const babel   = require('gulp-babel')
const clean   = require('gulp-clean')
const mocha   = require('gulp-mocha')
const concat  = require('gulp-concat')
const clc     = require('cli-color')
const nodemon = require('gulp-nodemon')
var jsdoc     = require('gulp-jsdoc3')

const main       = 'index.js'
const buildDir   = 'build'
const libDir     = 'lib'
const testDir    = 'test'
const distDir    = 'dist'
const sources    = [path.join(libDir, '**', '*.js')]
const tests      = [path.join(testDir, '**', '*.js')]
const buildTests = tests.map(v => path.join(buildDir, v))
const buildFiles = path.join(buildDir, '**', '*.*')
const dists      = [path.join(distDir, '**', '*.js')]

gulp.task('default', ['build'])

gulp.task('clean', ['clean:lib', 'clean:test'])
gulp.task('clean:lib', function () {
  return gulp.src(path.join(buildDir, libDir), {read: false})
    .pipe(clean())
})
gulp.task('clean:test', function () {
  return gulp.src(path.join(buildDir, testDir), {read: false})
    .pipe(clean())
})

gulp.task('build', ['build:lib', 'build:test'])
gulp.task('build:lib', ['clean:lib'], function () {
  return gulp.src(sources)
    .pipe(babel())
    .pipe(gulp.dest(path.join(buildDir, libDir)))
    .pipe(gulp.dest(path.join(distDir)))
})
gulp.task('build:test', ['clean:test'], function () {
  return gulp.src(tests)
    .pipe(babel())
    .pipe(gulp.dest(path.join(buildDir, testDir)))
})

gulp.task('test', ['build'], function () {
  gulp.src(buildTests)
    .pipe(mocha({
      reporter: 'dot'
    }))
})
gulp.task('test:force', ['build'], function () {
  gulp.src(buildTests)
    .pipe(mocha({
      reporter: 'dot'
    }))
    .on('error', function (e) {
      if (typeof e.stack === 'undefined') return
      console.log(clc.red(`[ERROR] ${e.stack}`))
      this.emit(e)
    })
})
gulp.task('watch:test', ['test:force'], function () {
  gulp.watch([].concat(sources, tests), ['test:force'])
})
gulp.task('watch:build', ['build'], function () {
  gulp.watch([].concat(sources, tests), ['build'])
})
gulp.task('server', ['build:lib'], function () {
  nodemon({
    script: path.join(buildDir, libDir, 'index.js'),
    ext: 'js',
    ignore: ['gulpfile.js'].concat(buildFiles, tests, dists),
    env: {
      'NODE_ENV': 'development'
    },
    tasks: ['build:lib']
  })
})

gulp = require 'gulp'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
gutil = require 'gulp-util'
path = require 'path'
mocha = require 'gulp-mocha'

gulp.task 'concat', ->
  gulp.src [
    'src/polyfill.coffee'
    'src/circos.coffee'
    'src/dataParser.coffee'
    'src/layout.coffee'
    'src/tracks.coffee'
    'src/tracks/*.coffee'
    'src/renderLayout.coffee'
    'src/render.coffee'
    'src/defaultParameters.coffee'
    'src/behaviors/*.coffee'
  ]
  .pipe concat 'circosJS.coffee'
  .pipe gulp.dest 'build'
  .on 'error', gutil.log

gulp.task 'compile', ['concat'], ->
  gulp.src 'build/circosJS.coffee'
  .pipe coffee bare: true
  .pipe gulp.dest 'dist'

gulp.task 'build', ['compile']

gulp.task 'watch', ['build'], ->
  gulp.watch 'src/**/*.coffee', ['compile']

gulp.task 'test', ['compile'], ->
  gulp.src 'test/**/*.coffee', read: false
  .pipe mocha reporter: 'spec', compilers: 'coffee:coffee-script'
  .on 'error', gutil.log

gulp.task 'tdd', ['test'], ->
  gulp.watch ['src/**/*.coffee', 'test/**/*.coffee'], ['test']

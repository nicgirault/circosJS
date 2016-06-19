module.exports = (config) ->
  config.set
    frameworks: ['mocha', 'chai', 'sinon']
    files: [
      'bower_components/d3/d3.js'
      'bower_components/d3-tip/index.js'
      'src/polyfill.coffee'
      'src/circos.coffee'
      'src/dataParser.coffee'
      'src/layout.coffee'
      'src/render.coffee'
      'src/renderLayout.coffee'
      'src/tracks.coffee'
      'src/tracks/*.coffee'
      'src/defaultParameters.coffee'
      'src/behaviors/*.coffee'
      'test/**/*.coffee'
    ]
    exclude: []
    preprocessors:
      '**/*.coffee': ['coffee']
      'src/**/*.coffee': ['coverage']
    coverageReporter:
      dir: 'coverage'
      reporters: [
        type: 'html'
        subdir: 'client-report'
      ,
        type: 'text-summary'
      ]
      watermarks:
        statements: [70, 80]
        functions: [70, 80]
        branches: [70, 80]
        lines: [70, 80]
    reporters: [ 'progress' , 'coverage' ]
    port: 9876
    colors: true
    logLevel: config.LOG_INFO
    autoWatch: true
    browsers: [ 'PhantomJS' ]
    singleRun: process.env.SINGLE_RUN || true
  return

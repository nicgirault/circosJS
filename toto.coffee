module.exports = (config) ->
  config.set
    frameworks: ['mocha', 'chai', 'sinon']
    files: [
      'src/utils.js'
      'src/utils.test.js'
    ]
    exclude: []
    preprocessors:
      '**/*.coffee': ['coffee']
      'src/**/*.coffee': ['coverage']
      'src/*.js': ['babel']
      'src/**/*.js': ['babel']
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        plugins: ["transform-es2015-modules-umd"]
        sourceMap: 'inline'
      },
    }
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

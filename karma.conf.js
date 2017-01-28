module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      {pattern: 'src/*.test.js', watched: false},
      {pattern: 'src/**/*.test.js', watched: false}
    ],
    preprocessors: {
      'src/*.test.js': ['webpack', 'babel'],
      'src/**/*.test.js': ['webpack', 'babel']
    },
    webpack: {
      devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: process.env.SINGLE_RUN || true,
  });
};

var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: false, //just run once by default
    frameworks: [ 'mocha' ], //use the mocha test framework
    files: [
      'tests.webpack.js' //just load this file
    ],
    plugins: [
      'karma-mocha', 'karma-webpack', 'karma-sourcemap-loader', 'karma-chrome-launcher', 'karma-mocha-reporter'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'mocha' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react'],
              plugins: ['transform-class-properties']
            }
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};

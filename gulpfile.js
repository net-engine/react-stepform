var gulp              = require("gulp");
var gutil             = require("gulp-util");
var webpack           = require("webpack");
var WebpackDevServer  = require("webpack-dev-server");

var webpackDevelopmentConfig = require('./webpack.dev.config.js');

gulp.task("webpack-dev-server", function(callback) {
  var myConfig = Object.create(webpackDevelopmentConfig);

  new WebpackDevServer(webpack(myConfig), {
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

    // keep the server alive or continue?
    // callback();
  });
});

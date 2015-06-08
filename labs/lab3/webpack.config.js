var path = require("path");

module.exports = {
  entry: {
    app: "./js/app"
  },
  resolve: {
    extensions: [".js"],
  },
  output: {
    path: "./dist",
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel?stage=0"
    }]
  }
};

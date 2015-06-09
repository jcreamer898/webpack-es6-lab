var webpack = require("webpack");

module.exports = {
  entry: {
    common: [],
    index: "./js/index",
    arthur: "./js/arthur"
  },
  output: {
    path: "./dist",
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: "style!css!sass"
    }]
  },
  plugins: [new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    minChunks: 2
  })]
};

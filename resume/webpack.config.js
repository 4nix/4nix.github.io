var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('./build/common.js');

module.exports = {
  entry: [
  "./src/app.js"
  ],
  output: {
    filename: "./build/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/,  loader: "jsx-loader"}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [commonsPlugin]
};
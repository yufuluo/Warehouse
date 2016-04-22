"use strict";

module.exports = {
  entry: "./public/app.js",
  output: {
    path: "./dist",
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  }
};

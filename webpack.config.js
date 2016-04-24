/* eslint-disable no-var */
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    "./src/app",
    "./src/styles/app.css"
  ],
  devtool: "eval-source-map",
  output: {
    path: __dirname,
    filename: "app.js",
    publicPath: "/js/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        include: path.join(__dirname, "src/styles")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("app.css")
  ]
};

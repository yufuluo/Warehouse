"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authtication = require("./lib/authentication");
const errorHandler = require("./lib/errorHandler");
const path = require("path");
const webpack = require("webpack");

const webpackConfig = require("./webpack.config");

const app = express();

const compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

require("mongoose").connect("mongodb://localhost:27017/test");

app.set("port", process.env.PORT || 8000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
//app.use(authtication);
//app.use(errorHandler);

const config = require("./config/default");

const route = require("./lib/route");
app.use(config.basePath.ui, route.uiRouter);
app.use(config.basePath.api, route.apiRouter);
app.use(express.static('src'));

app.listen(app.get("port"), () => {
  console.log("Server started: http://localhost:" + app.get("port") + "/");
});
